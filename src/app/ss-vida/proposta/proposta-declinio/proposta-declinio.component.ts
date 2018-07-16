import { PropostaService } from './../service/proposta.service';
import { UtilService } from './../../shared/services/util.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proposta-declinio',
  templateUrl: './proposta-declinio.component.html',
  styleUrls: ['./proposta-declinio.component.scss']
})
export class PropostaDeclinioComponent implements OnInit, OnDestroy {

  public formulario: FormGroup;
  public contasDevolucao: any = [];
  public exibeFormNovaConta = false;
  private pathSub: any;
  exibeDadosBancarios = false;
  contaDevolucaoSelecionada: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private propostaService: PropostaService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      numeroProposta: ['', null],
      versao: ['', null],
      propostaNome: ['', null],
      propostaCpf: ['', null],
      propostaItem: ['', null],
      propostaSeqPessoa: ['', null],
      propostaProduto: ['', null],
      propostaApolice: ['', null],
      propostaProposta: ['', null],
      propostaSituacao: ['', null],
      motivoDeclinio: [null, Validators.required],
      formaDevolucao: [null, Validators.required],
      novoBanco: [null, Validators.required],
      novaOperacao: [null, Validators.required],
      novaAgencia: [null, Validators.required],
      novoDvAgencia: [null, Validators.required],
      novaConta: [null, Validators.required],
      novoDvConta: [null, Validators.required]
    });

    this.pathSub = this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      this.propostaService.get( codigo ).subscribe( res => {
        this.preencherFormulario( res );
      });
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  preencherFormulario( proposta: any ) {
    this.formulario.patchValue( {
      numeroProposta: proposta.numeroProposta,
      versao: proposta.versao,
      propostaNome: proposta.pessoa.nome,
      propostaCpf: proposta.pessoa.cpfCnpj,
      propostaItem: proposta.pessoa.numeroItem,
      propostaSeqPessoa: proposta.pessoa.seqSegurado,
      propostaProduto: proposta.produto.codigo + ' - ' + proposta.produto.descricao,
      propostaApolice: proposta.numeroApolice,
      propostaProposta: proposta.numeroPropostaExterna,
      propostaSituacao: proposta.situacaoProposta.descricao,
      motivoDeclinio: this.constantesService.getMotivoDeclinioProposta(proposta.informacoesDeclinio.motivoDeclinio),
      formaDevolucao: this.constantesService.getFormaDevolucaoProposta(proposta.informacoesDeclinio.motivoDeclinio)
    } );

    this.formulario.controls['novoBanco'].disable();
    this.formulario.controls['novaOperacao'].disable();
    this.formulario.controls['novaAgencia'].disable();
    this.formulario.controls['novoDvAgencia'].disable();
    this.formulario.controls['novaConta'].disable();
    this.formulario.controls['novoDvConta'].disable();
  }

  onChangeFormaDevolucao (event) {
    this.exibeDadosBancarios = false;
    const formaDevolucao = this.formulario.get('formaDevolucao').value;
    if (formaDevolucao.codigo === '1') {
      this.exibeDadosBancarios = true;
      const cpfCnpj = this.formulario.get('propostaCpf').value;
      const propostaNome = this.formulario.get('propostaNome').value;
      this.propostaService.getContasDevolucao({cpfCnpj: cpfCnpj, nome: propostaNome}).subscribe ( res => {
        this.contasDevolucao = res['data'];
      });
    } else {
      this.contaDevolucaoSelecionada = null;
    }
  }

  novaConta() {
    this.exibeFormNovaConta = true;
    this.formulario.controls['novoBanco'].enable();
    this.formulario.controls['novaOperacao'].enable();
    this.formulario.controls['novaAgencia'].enable();
    this.formulario.controls['novoDvAgencia'].enable();
    this.formulario.controls['novaConta'].enable();
    this.formulario.controls['novoDvConta'].enable();
  }

  closeNovaConta() {
    this.exibeFormNovaConta = false;
    this.formulario.controls['novoBanco'].disable();
    this.formulario.controls['novaOperacao'].disable();
    this.formulario.controls['novaAgencia'].disable();
    this.formulario.controls['novoDvAgencia'].disable();
    this.formulario.controls['novaConta'].disable();
    this.formulario.controls['novoDvConta'].disable();
  }

  onChangeContaDevolucao(conta) {
    this.contaDevolucaoSelecionada = Object.assign({}, this.contaDevolucaoSelecionada, conta);
  }

  voltar() {
    const proposta = this.formulario.value;
    this.router.navigate( [ `/proposta/${proposta.propostaProposta}` ] );
  }

  salvar() {
    this.mensagemService.limparMensagens();
    if (this.formulario.valid) {

      const proposta = this.formulario.value;
      if (proposta.formaDevolucao.codigo === '2') {
        this.contaDevolucaoSelecionada = {codigoBanco: 0, dvBanco: 0, codigoAgencia: 0, dvAgencia: '', numeroConta: '', dvConta: '',
        codigoOperacaoCEF: {codigo: 0} };
      } else if (!this.contaDevolucaoSelecionada) {
        // credito em conta
        this.mensagemService.enviarAlerta('Ao menos uma Conta para Devolução deve ser selecionada!');
        return;
      }

      this.propostaService.declinar(
        proposta.numeroProposta,
        proposta.versao,
        { cpfCnpj: proposta.propostaCpf,
          nome: proposta.propostaNome,
          numItem: proposta.propostaItem,
          seqPessoaProposta: proposta.propostaSeqPessoa,
          motivoDeclinio: proposta.motivoDeclinio.codigo,
          formaDevolucao: proposta.formaDevolucao.codigo
        },
        this.contaDevolucaoSelecionada).subscribe (res => {
          this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
          this.finalizar(proposta);
        });

      } else {
        this.utilService.validateAllFormFields(this.formulario);
        // const invalids = this.utilService.getInvalidControls(this.formulario);
        // console.log(invalids);
      }
    }

    finalizar(proposta: any = false) {
      this.formulario.markAsPristine();
      if (proposta && proposta.propostaProposta) {
        this.router.navigate( [ `/proposta/${proposta.propostaProposta}` ] );
      } else {
        this.pesquisarProposta();
      }
    }

    pesquisarProposta() {
      this.router.navigate(['/proposta']);
    }
}
