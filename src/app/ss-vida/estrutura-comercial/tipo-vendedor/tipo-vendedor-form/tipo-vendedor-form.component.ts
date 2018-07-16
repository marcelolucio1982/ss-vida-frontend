import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TipoVendedorService } from './../service/tipo-vendedor.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-tipo-vendedor-form',
  templateUrl: './tipo-vendedor-form.component.html',
  styleUrls: ['./tipo-vendedor-form.component.css']
})
export class TipoVendedorFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoVendedorService: TipoVendedorService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({});

    this.pathSub = this.route.params.subscribe(params => {
      const codigo = +params['id'];
      const dataInicioVigencia = params['vigencia_valor'];
      const dataHoraCadastro = params['atualizacao_valor'];

      if (codigo && dataInicioVigencia && dataHoraCadastro) {
        this.tipoVendedorService.get({'codigo': codigo, 'dataInicioVigencia': dataInicioVigencia,
        'dataHoraCadastro': dataHoraCadastro}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });

  }

  private configurarFormulario(tipoVendedor) {

    if (this.formulario) {

      this.formulario.patchValue({
        dataInicioVigencia: tipoVendedor.dataInicioVigencia,
        dataFimVigencia: tipoVendedor.dataFimVigencia,
        dataHoraCadastro: tipoVendedor.dataHoraCadastro,
        codigo: tipoVendedor.codigo,
        descricao: tipoVendedor.descricao,
        situacao: tipoVendedor.situacao,
        status: (tipoVendedor.situacao ? tipoVendedor.situacao.descricao : '')
      });
    } else {
      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [tipoVendedor.dataInicioVigencia, Validators.required],
        dataFimVigencia: [tipoVendedor.dataFimVigencia, this.isEncerramento() ? Validators.required : null],
        dataHoraCadastro: [tipoVendedor.dataHoraCadastro, null],
        codigo: [tipoVendedor.codigo, null],
        descricao: [tipoVendedor.descricao, Validators.required],
        situacao: [tipoVendedor.situacao],
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
    return this.getTipoVendedor().situacao && this.getTipoVendedor().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getTipoVendedor().situacao && this.getTipoVendedor().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getTipoVendedor().situacao && this.getTipoVendedor().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getTipoVendedor().situacao && this.getTipoVendedor().situacao.codigo === '3';
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getTipoVendedor() {
    return this.formulario.value;
  }

  editarTipoVendedor(tipoVendedor) {
    this.router.navigate(['/tipo-vendedor', tipoVendedor.codigo, 'vigencia', tipoVendedor.dataInicioVigencia,
      'atualizacao', tipoVendedor.dataHoraCadastro, 'editar']);
  }

  pesquisarTipoVendedor() {
    this.router.navigate(['/tipo-vendedor']);
  }

  salvarTipoVendedor(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const tipoVendedor: any = this.formulario.value;

      if (this.isEdicao()) {
        // Eh edicao de Tipo Vendedor
        this.update(tipoVendedor, aprovar);

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento do Tipo de Vendedor?').subscribe( result => {
           if (result) {
              this.tipoVendedorService.close(tipoVendedor).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(tipoVendedor);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.tipoVendedorService.add(tipoVendedor, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Tipo de Vendedor realizado com sucesso!');
          this.finalizar(tipoVendedor);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(tipoVendedor, aprovar) {
    this.tipoVendedorService.update(tipoVendedor, aprovar).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(tipoVendedor: any = false) {
    this.formulario.markAsPristine();
    if (tipoVendedor && tipoVendedor.codigo && tipoVendedor.dataInicioVigencia && tipoVendedor.dataHoraCadastro) {
      this.router.navigate(['/tipo-vendedor', tipoVendedor.codigo,
        'vigencia', tipoVendedor.dataInicioVigencia, 'atualizacao', tipoVendedor.dataHoraCadastro]);
    } else {
      this.pesquisarTipoVendedor();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
