import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VendedorService } from './../service/vendedor.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor-form.component.css']
})
export class VendedorFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendedorService: VendedorService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({});

    this.pathSub = this.route.params.subscribe(params => {
      const seqVendedor = +params['id'];
      const dthCadastramento = params['dthCadastramento'];

      if (seqVendedor && dthCadastramento) {
        this.vendedorService.get(seqVendedor, {'dataHoraCadastramento': dthCadastramento}).subscribe(res => {
          console.log(res['data']);
          this.configurarFormulario(res['data']);
        });
      }
    });

  }

  private configurarFormulario(vendedor) {

    if (this.formulario) {

      this.formulario.patchValue({

        // readOnly
        cpf: vendedor.pessoaPapelNegocio ? vendedor.pessoaPapelNegocio.pessoa.cpfCnpj : '',
        nome: vendedor.pessoaPapelNegocio ? vendedor.pessoaPapelNegocio.pessoa.nomeRazaoSocial : '',
        situacao: vendedor.situacao,
        status: (vendedor.situacao ? vendedor.situacao.descricao : ''),

        codigoExterno: vendedor.codigoExterno,
        pessoaPapelNegocio: vendedor.pessoaPapelNegocio,
        parceiro: this.constantesService.getParceiro(vendedor.parceiro),
        tipoVendedor: this.constantesService.getTipoVendedor(vendedor.tipoVendedor),
        dataInicioVigencia: vendedor.dataInicioVigencia,

        dataFimVigencia: vendedor.dataFimVigencia,
        dataHoraCadastramento: vendedor.dataHoraCadastramento,

      });
    } else {
      this.formulario = this.formBuilder.group({
        // readOnly
        cpf: [null, Validators.required],
        nome: [null, Validators.required],
        situacao: [vendedor.situacao],
        status: [{value: '', disabled: true}, null],

        codigoExterno: [vendedor.codigoExterno, Validators.required],
        pessoaPapelNegocio: [vendedor.pessoaPapelNegocio, Validators.required],
        parceiro: [this.constantesService.getParceiro(vendedor.parceiro), Validators.required],
        tipoVendedor: [this.constantesService.getTipoVendedor(vendedor.tipoVendedor), Validators.required],
        dataInicioVigencia: [vendedor.dataInicioVigencia, Validators.required],
        dataFimVigencia: [vendedor.dataFimVigencia, this.isEncerramento() ? Validators.required : null],

        dataHoraCadastramento: [vendedor.dataHoraCadastramento, null],

        // readOnly ?
        inicioVigenciaParceiro: [null, Validators.required],
        parceiroLocalVenda: [null, Validators.required],
        opcaoLocalVenda: [null, Validators.required],
        codigoExternoNomeLocalVenda: [null, Validators.required],
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
    // FIXME : verificar se nao eh seqVendedor
    // Se nao tem codigo (ID) eh um cadastro
    return !this.formulario.value.codigo;
  }

  isNovaVersao() {
    return this.route.routeConfig.path === ':id/dthCadastramento/:dthCadastramento/novo';
  }

  isVisualizacao() {
    return this.route.routeConfig.path === ':id/dthCadastramento/:dthCadastramento';
  }

  isEdicao() {
    return this.route.routeConfig.path === ':id/dthCadastramento/:dthCadastramento/editar';
  }

  isEncerramento() {
    return this.route.routeConfig.path === ':id/dthCadastramento/:dthCadastramento/encerrar';
  }

  isSituacaoEditavel () {
    return this.isSituacaoPendente() || this.isSituacaoAprovado();
  }

  isSituacaoPendente() {
    // Codigo situacao = 0 (Registro Pendente)
    return this.getVendedor().situacao && this.getVendedor().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getVendedor().situacao && this.getVendedor().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getVendedor().situacao && this.getVendedor().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getVendedor().situacao && this.getVendedor().situacao.codigo === '3';
  }

  getVendedor() {
    return this.formulario.value;
  }

  editarVendedor(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento, 'editar']);
  }

  gerarVersao(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento, 'novo']);
  }

  pesquisar() {
    this.router.navigate(['/vendedor']);
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  salvarVendedor(aprovar = false) {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const vendedor: any = this.formulario.value;

      if (this.isEdicao() || this.isNovaVersao()) {
        // Eh edicao de Vendedor ou Geração de Nova Versao

        // Se eh aprovacao de uma nova versao de um vendedor vigente, deve solicitar uma confirmacao
        // TODO : implentar regra também para quando a aprovacao for posterior ?
        if (this.isNovaVersao() && this.isSituacaoVigente && aprovar) {
          this.mensagemService.enviarMsgConfirm(
            'Ao aprovar você concorda com o encerramento da versão anterior a partir da data de Início de Vigência.'
          + 'Confirmar nova versão do Vendedor?').subscribe( result => {
            if (result) {
              this.update(vendedor, aprovar);
            }
          });

        // Caso contrario faz o update direto
        } else {
          this.update(vendedor, aprovar);
        }

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento do Vendedor?').subscribe( result => {
           if (result) {
              this.vendedorService.close(vendedor).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(vendedor);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.vendedorService.add(vendedor, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Vendedor realizado com sucesso!');
          this.finalizar(vendedor);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  update(vendedor, aprovar) {
    this.vendedorService.update(vendedor, aprovar, this.isNovaVersao()).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(vendedor: any = false) {
    this.formulario.markAsPristine();
    if (vendedor && vendedor.seqVendedor && vendedor.dataHoraCadastramento) {
      this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento]);
    } else {
      this.pesquisar();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
