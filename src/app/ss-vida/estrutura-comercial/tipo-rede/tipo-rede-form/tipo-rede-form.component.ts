import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TipoRedeService } from './../service/tipo-rede.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-tipo-rede-form',
  templateUrl: './tipo-rede-form.component.html',
  styleUrls: ['./tipo-rede-form.component.css']
})
export class TipoRedeFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoRedeService: TipoRedeService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({});

    this.pathSub = this.route.params.subscribe(params => {
      const codigo = +params['id'];
      const dataInicioVigencia = params['vigencia_valor'];
      const dataHoraAtualizacao = params['atualizacao_valor'];

      if (codigo && dataInicioVigencia && dataHoraAtualizacao) {
        this.tipoRedeService.get({'codigo': codigo, 'dataInicioVigencia': dataInicioVigencia,
        'dataHoraAtualizacao': dataHoraAtualizacao}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });

  }

  private configurarFormulario(tipoLocalVenda) {

    if (this.formulario) {

      this.formulario.patchValue({
        dataInicioVigencia: tipoLocalVenda.dataInicioVigencia,
        dataFimVigencia: tipoLocalVenda.dataFimVigencia,
        dataHoraAtualizacao: tipoLocalVenda.dataHoraAtualizacao,
        codigo: tipoLocalVenda.codigo,
        descricao: tipoLocalVenda.descricao,
        situacao: tipoLocalVenda.situacao,
        status: (tipoLocalVenda.situacao ? tipoLocalVenda.situacao.descricao : '')
      });
    } else {
      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [tipoLocalVenda.dataInicioVigencia, Validators.required],
        dataFimVigencia: [tipoLocalVenda.dataFimVigencia, this.isEncerramento() ? Validators.required : null],
        dataHoraAtualizacao: [tipoLocalVenda.dataHoraAtualizacao, null],
        codigo: [tipoLocalVenda.codigo, null],
        descricao: [tipoLocalVenda.descricao, Validators.required],
        situacao: [tipoLocalVenda.situacao],
        status: [{value: '', disabled: true}, null]
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

  isVisualizacao() {
    return this.route.routeConfig.path === ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor';
  }

  isEdicao() {
    return this.route.routeConfig.path === ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar';
  }

  isEncerramento() {
    return this.route.routeConfig.path === ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar';
  }

  isSituacaoEditavel () {
    return this.isSituacaoPendente() || this.isSituacaoAprovado();
  }

  isSituacaoPendente() {
    // Codigo situacao = 0 (Registro Pendente)
    return this.getTipoRede().situacao && this.getTipoRede().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getTipoRede().situacao && this.getTipoRede().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getTipoRede().situacao && this.getTipoRede().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getTipoRede().situacao && this.getTipoRede().situacao.codigo === '3';
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getTipoRede() {
    return this.formulario.value;
  }

  editarTipoRede(tipoRede) {
    this.router.navigate(['/tipo-rede', tipoRede.codigo, 'vigencia', tipoRede.dataInicioVigencia,
      'atualizacao', tipoRede.dataHoraAtualizacao, 'editar']);
  }

  pesquisarTipoRede() {
    this.router.navigate(['/tipo-rede']);
  }

  salvarTipoRede(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const tipoRede: any = this.formulario.value;

      if (this.isEdicao()) {
        // Eh edicao de Tipo Local de Venda
        this.update(tipoRede, aprovar);

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento do Tipo Local de Venda?').subscribe( result => {
           if (result) {
              this.tipoRedeService.close(tipoRede).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(tipoRede);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.tipoRedeService.add(tipoRede, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Tipo de Rede realizado com sucesso!');
          this.finalizar(tipoRede);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(tipoLocalVenda, aprovar) {
    this.tipoRedeService.update(tipoLocalVenda, aprovar).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(tipoRede: any = false) {
    this.formulario.markAsPristine();
    if (tipoRede && tipoRede.codigo && tipoRede.dataInicioVigencia && tipoRede.dataHoraAtualizacao) {
      this.router.navigate(['/tipo-rede', tipoRede.codigo,
        'vigencia', tipoRede.dataInicioVigencia, 'atualizacao', tipoRede.dataHoraAtualizacao]);
    } else {
      this.pesquisarTipoRede();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
