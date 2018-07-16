import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AssistenciaService } from './../service/assistencia.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-assistencia-form',
  templateUrl: './assistencia-form.component.html',
  styleUrls: ['./assistencia-form.component.css']
})
export class AssistenciaFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assistenciaService: AssistenciaService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({'versao': 0});

    this.pathSub = this.route.params.subscribe(params => {
      const codigo = +params['id'];
      const versao = +params['versao'];

      if (codigo && versao) {
        this.assistenciaService.get({'codigo': codigo, 'versao': versao}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });
  }

  private configurarFormulario(assistencia) {

    if (this.formulario) {

      this.formulario.patchValue({
        dataInicioVigencia: assistencia.dataInicioVigencia,
        dataFimVigencia: assistencia.dataFimVigencia,
        dataAtualizacao: assistencia.dataAtualizacao,
        codigo: assistencia.codigo,
        descricao: assistencia.descricao,
        nomeImpressao: assistencia.nomeImpressao,
        observacao: assistencia.observacao,
        situacao: assistencia.situacao,
        status: (assistencia.situacao ? assistencia.situacao.descricao : ''),
        versao: assistencia.versao
      });
    } else {
      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [assistencia.dataInicioVigencia, Validators.required],
        dataFimVigencia: [assistencia.dataFimVigencia, this.isEncerramento() ? Validators.required : null],
        dataAtualizacao: [assistencia.dataAtualizacao, null],
        codigo: [assistencia.codigo, null],
        descricao: [assistencia.descricao, Validators.required],
        nomeImpressao: [assistencia.nomeImpressao, Validators.required],
        observacao: [assistencia.observacao, null],
        situacao: [assistencia.situacao],
        status: [{value: '', disabled: true}, null],
        versao: [assistencia.versao]
      });

      this.utilService.configurarInputData(this.formulario, 'dataInicioVigencia');
      this.utilService.configurarInputData(this.formulario, 'dataFimVigencia');
    }

    this.utilService.updateMaterializeTextFields();

  }

  bloquearEdicaoDataInicio() {
    return this.isVisualizacao() || this.isEncerramento();
  }

  bloquearEdicaoDataFim() {
    return this.isVisualizacao() || this.isSituacaoEncerrado();
  }

  isCadastro() {
    // Se nao tem codigo (ID) eh um cadastro
    return !this.formulario.value.codigo;
  }

  isNovaVersao() {
    return this.route.routeConfig.path === ':id/versoes/:versao/novo';
  }

  isVisualizacao() {
    return this.route.routeConfig.path === ':id/versoes/:versao';
  }

  isEdicao() {
    return this.route.routeConfig.path === ':id/versoes/:versao/editar';
  }

  isEncerramento() {
    return this.route.routeConfig.path === ':id/versoes/:versao/encerrar';
  }

  isSituacaoEditavel () {
    return this.isSituacaoPendente() || this.isSituacaoAprovado();
  }

  isSituacaoPendente() {
    // Codigo situacao = 0 (Registro Pendente)
    return this.getAssistencia().situacao && this.getAssistencia().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getAssistencia().situacao && this.getAssistencia().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getAssistencia().situacao && this.getAssistencia().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getAssistencia().situacao && this.getAssistencia().situacao.codigo === '3';
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getAssistencia() {
    return this.formulario.value;
  }

  editarAssistencia(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao, 'editar']);
  }

  gerarVersao(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao, 'novo']);
  }

  pesquisarAssistencia() {
    this.router.navigate(['/assistencia']);
  }

  salvarAssistencia(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const assistencia: any = this.formulario.value;

      if (this.isEdicao() || this.isNovaVersao()) {
        // Eh edicao de Assistencia ou Geração de Nova Versao

        // Se eh aprovacao de uma nova versao de uma assistencia vigente, deve solicitar uma confirmacao
        // TODO : implentar regra também para quando a aprovacao for posterior ?
        if (this.isNovaVersao() && this.isSituacaoVigente && aprovar) {
          this.mensagemService.enviarMsgConfirm(
            'Ao aprovar você concorda com o encerramento da versão anterior a partir da data de Início de Vigência.'
          + 'Confirmar nova versão da Assistência?').subscribe( result => {
            if (result) {
              this.update(assistencia, aprovar);
            }
          });

        // Caso contrario faz o update direto
        } else {
          this.update(assistencia, aprovar);
        }

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento da Assistência?').subscribe( result => {
           if (result) {
              this.assistenciaService.close(assistencia).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(assistencia);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.assistenciaService.add(assistencia, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Assistência realizado com sucesso!');
          this.finalizar(assistencia);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(assistencia, aprovar) {
    this.assistenciaService.update(assistencia, aprovar, this.isNovaVersao()).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(assistencia: any = false) {
    this.formulario.markAsPristine();
    if (assistencia && assistencia.codigo && assistencia.versao) {
      this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao]);
    } else {
      this.pesquisarAssistencia();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
