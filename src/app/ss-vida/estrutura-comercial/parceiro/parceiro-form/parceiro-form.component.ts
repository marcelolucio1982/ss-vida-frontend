import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ParceiroService } from './../service/parceiro.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';
import { AgrupadorParceiroService } from './../../agrupador-parceiro/service/agrupador-parceiro.service';

@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.css']
})
export class ParceiroFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;
  agrupadoresParceiro: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private parceiroService: ParceiroService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService,
    private agrupadorParceiroService: AgrupadorParceiroService,
  ) { }

  ngOnInit() {

    this.configurarFormulario({});
    this.pathSub = this.route.params.subscribe(params => {
      const codigo = +params['id'];
      const dataInicioVigencia = params['vigencia_valor'];
      const dataHoraCadastramento = params['atualizacao_valor'];

      if (codigo && dataInicioVigencia && dataHoraCadastramento) {
        this.parceiroService.get({'codigo': codigo, 'dataInicioVigencia': dataInicioVigencia,
        'dataHoraCadastramento': dataHoraCadastramento}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });

    this.agrupadorParceiroService.list({}).subscribe(
      res => { this.agrupadoresParceiro = res; });
  }

  private configurarFormulario(parceiro) {

    if (this.formulario) {

      this.formulario.patchValue({
        dataInicioVigencia: parceiro.dataInicioVigencia,
        dataFimVigencia: parceiro.dataFimVigencia,
        dataHoraCadastramento: parceiro.dataHoraCadastramento,
        codigo: parceiro.codigo,
        nomeRazaoSocial: (parceiro.nomeRazaoSocial),
        cpfCnpj: (parceiro.cpfCnpj),
        agrupador: this.getAgrupadorParceiro(parceiro.agrupador),
        situacao: parceiro.situacao,
        status: (parceiro.situacao ? parceiro.situacao.descricao : '')
      });
    } else {
      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [parceiro.dataInicioVigencia, Validators.required],
        dataFimVigencia: [parceiro.dataFimVigencia, this.isEncerramento() ? Validators.required : null],
        dataHoraCadastramento: [parceiro.dataHoraCadastramento, null],
        codigo: [parceiro.codigo, null],
        nomeRazaoSocial: [parceiro.nomeRazaoSocial, Validators.required],
        cpfCnpj: [parceiro.cpfCnpj, Validators.required],
        agrupador: [this.getAgrupadorParceiro(parceiro.agrupador), Validators.required],
        situacao: [parceiro.situacao],
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
    return this.getParceiro().situacao && this.getParceiro().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getParceiro().situacao && this.getParceiro().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getParceiro().situacao && this.getParceiro().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getParceiro().situacao && this.getParceiro().situacao.codigo === '3';
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getParceiro() {
    return this.formulario.value;
  }

  editarParceiro(parceiro) {
    this.router.navigate(['/parceiro', parceiro.codigo, 'vigencia', parceiro.dataInicioVigencia,
      'atualizacao', parceiro.dataHoraCadastramento, 'editar']);
  }

  pesquisarParceiro() {
    this.router.navigate(['/parceiro']);
  }

  salvarParceiro(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const parceiro: any = this.formulario.value;

      if (this.isEdicao()) {
        // Eh edicao de Parceiro
        this.update(parceiro, aprovar);

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento do Parceiro?').subscribe( result => {
           if (result) {
              this.parceiroService.close(parceiro).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(parceiro);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.parceiroService.add(parceiro, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Parceiro realizado com sucesso!');
          this.finalizar(parceiro);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(parceiro, aprovar) {
    this.parceiroService.update(parceiro, aprovar).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(parceiro: any = false) {
    this.formulario.markAsPristine();
    if (parceiro && parceiro.codigo && parceiro.dataInicioVigencia && parceiro.dataHoraCadastramento) {
      this.router.navigate(['/parceiro', parceiro.codigo,
        'vigencia', parceiro.dataInicioVigencia, 'atualizacao', parceiro.dataHoraCadastramento]);
    } else {
      this.pesquisarParceiro();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

  getAgrupadorParceiro(obj) {
    return obj && this.agrupadoresParceiro ? this.agrupadoresParceiro.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

}
