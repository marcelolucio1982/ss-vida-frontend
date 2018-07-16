import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmpresasAssistenciaService } from './../service/empresas-assistencia.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-empresas-assistencia-form',
  templateUrl: './empresas-assistencia-form.component.html',
  styleUrls: ['./empresas-assistencia-form.component.css']
})
export class EmpresasAssistenciaFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresasAssistenciaService: EmpresasAssistenciaService,
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
        this.empresasAssistenciaService.get({'codigo': codigo, 'versao': versao}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });
  }

  private configurarFormulario(empresaAssistencia) {

    if (this.formulario) {

      this.formulario.patchValue({
        dataInicioVigencia: empresaAssistencia.dataInicioVigencia,
        dataFimVigencia: empresaAssistencia.dataFimVigencia,
        dataAtualizacao: empresaAssistencia.dataAtualizacao,
        codigo: empresaAssistencia.codigo,
        nome: empresaAssistencia.nome,
        razaoSocial: empresaAssistencia.razaoSocial,
        cpfCnpj: empresaAssistencia.cpfCnpj,
        contatoCaixa: empresaAssistencia.contatoCaixa,
        contatoCliente: empresaAssistencia.contatoCliente,
        situacao: empresaAssistencia.situacao,
        status: (empresaAssistencia.situacao ? empresaAssistencia.situacao.descricao : ''),
        versao: empresaAssistencia.versao
      });
    } else {

      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [empresaAssistencia.dataInicioVigencia, Validators.required],
        dataFimVigencia: [empresaAssistencia.dataFimVigencia, this.isEncerramento() ? Validators.required : null],
        dataAtualizacao: [empresaAssistencia.dataAtualizacao, null],
        codigo: [empresaAssistencia.codigo, null],
        nome: [empresaAssistencia.nome, Validators.required],
        razaoSocial: [empresaAssistencia.razaoSocial, Validators.required],
        cpfCnpj: [empresaAssistencia.cpfCnpj, Validators.required],
        contatoCaixa: [empresaAssistencia.contatoCaixa, Validators.required],
        contatoCliente: [empresaAssistencia.contatoCliente, Validators.required],
        situacao: [empresaAssistencia.situacao],
        status: [{value: '', disabled: true}, null],
        versao: [empresaAssistencia.versao]
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
    return this.getEmpresaAssistencia().situacao && this.getEmpresaAssistencia().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getEmpresaAssistencia().situacao && this.getEmpresaAssistencia().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getEmpresaAssistencia().situacao && this.getEmpresaAssistencia().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getEmpresaAssistencia().situacao && this.getEmpresaAssistencia().situacao.codigo === '3';
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getEmpresaAssistencia() {
    return this.formulario.value;
  }

  editarEmpresaAssistencia(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao, 'editar']);
  }

  gerarVersao(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao, 'novo']);
  }

  pesquisarEmpresaAssistencia() {
    this.router.navigate(['/empresas-assistencia']);
  }

  salvarEmpresaAssistencia(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const empresaAssistencia: any = this.formulario.value;

      if (this.isEdicao() || this.isNovaVersao()) {
        // Eh edicao de Empresa de Assistencia ou Geração de Nova Versao

        // Se eh aprovacao de uma nova versao de uma empresa de assistencia vigente, deve solicitar uma confirmacao
        // TODO : implentar regra também para quando a aprovacao for posterior ?
        if (this.isNovaVersao() && this.isSituacaoVigente && aprovar) {
          this.mensagemService.enviarMsgConfirm(
            'Ao aprovar você concorda com o encerramento da versão anterior a partir da data de Início de Vigência.'
          + 'Confirmar nova versão da Empresa de Assistência?').subscribe( result => {
            if (result) {
              this.update(empresaAssistencia, aprovar);
            }
          });

        // Caso contrario faz o update direto
        } else {
          this.update(empresaAssistencia, aprovar);
        }

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento da Empresa de Assistência?').subscribe( result => {
           if (result) {
              this.empresasAssistenciaService.close(empresaAssistencia).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(empresaAssistencia);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.empresasAssistenciaService.add(empresaAssistencia, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Empresa de Assistência realizado com sucesso!');
          this.finalizar(empresaAssistencia);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(empresaAssistencia, aprovar) {
    this.empresasAssistenciaService.update(empresaAssistencia, aprovar, this.isNovaVersao()).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(empresaAssistencia: any = false) {
    this.formulario.markAsPristine();
    if (empresaAssistencia && empresaAssistencia.codigo && empresaAssistencia.versao) {
      this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao]);
    } else {
      this.pesquisarEmpresaAssistencia();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
