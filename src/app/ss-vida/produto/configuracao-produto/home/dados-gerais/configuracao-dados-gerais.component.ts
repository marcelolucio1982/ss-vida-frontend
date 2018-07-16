import { Component, OnInit, OnDestroy, HostListener, Output} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PeriodicidadePagamentosComponent } from './periodicidade/periodicidade-pagamentos.component';
import { PermissoesVendaComponent } from './permissoes-venda/permissoes-venda.component';
import { ConfiguracaoProdutoService } from './../../servico/configuracao-produto.service';
import { ConstantesService } from '../../../../shared/services/constantes.service';
import { MensagemService } from './../../../../shared/services/mensagem.service';
import { UtilService } from './../../../../shared/services/util.service';
import { CadastroProdutoService } from '../../../cadastro-produto/servico/cadastro-produto.service';
import { ParceiroService } from './../../../../estrutura-comercial/parceiro/service/parceiro.service';
import { TipoLocalVendaService } from './../../../../estrutura-comercial/tipo-local-venda/service/tipo-local-venda.service';

@Component({
  selector: 'app-configuracao-dados-gerais',
  templateUrl: './configuracao-dados-gerais.component.html',
  styleUrls: ['./configuracao-dados-gerais.component.scss']
})
export class ConfiguracaoDadosGeraisComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  isContrataBilhete: any = false;
  isRecontratacaoAutomatica: any = false;
  isRenovacaoAutomatica: any = false;
  isPossuiAssistencia: any = false;

  private pathSub: any;
  public retorno: any = false;

  public parceiroList: any;

  constructor(
    private configuracaoProdutoService: ConfiguracaoProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    public utilService: UtilService,
    private mensagemService: MensagemService,
    private produtoService: CadastroProdutoService,
    private tipoLocalVendaService: TipoLocalVendaService,
    private parceiroService: ParceiroService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({'versao': 0 });

    this.pathSub = this.route.parent.params.subscribe(params => {
      const codigo = +params['id'];
      const versao = +params['versao'];

      if (codigo && versao) {
        // abre uma configuracao de produto existente
        this.configuracaoProdutoService.get({produto: {'codigo': codigo, 'versao': versao}}).subscribe(res => {
          const configuracaoProduto = res['data'];
          this.parceiroService.list( { dataInicioVigencia: configuracaoProduto.dataInicioVigencia } ).subscribe( res2 => {
            this.parceiroList = res2;
            this.configurarFormulario(configuracaoProduto);
          });

        });
      } else {
        // configura o produto pela primeira vez
        this.produtoService.get({codigo: codigo}).subscribe(res => {
          this.configurarFormulario({
          'versao': 0,
          'recontratacaoAutomatica': null,
          'qtdRecontratacaoAutomatica': null,
          'dataUltimaAtualizacao': null,
          'sequencialProduto': null,
          'dataAtualizacao': null,
          'codigoSituacaoConfiguracao': null,
          'descricaoSituacaoConfiguracao': null,
           produto: res
          }, true);
        });
      }
    });

    this.formulario.get( 'dataInicioVigencia' ).valueChanges.subscribe( data => {
      if ( data && data.length > 0 ) {
        // fixme : bug valueChange estava mudando o formato na segunda chamada
        if (!this.utilService.formatarDataModelo(data)) {
          return;
        }

        this.parceiroService.list( { dataInicioVigencia: this.utilService.formatarDataModelo(data) } ).subscribe( res => {
          this.parceiroList = res;
        });
      }
    });

  }

  private configurarFormulario(configuracaoProduto, isNovoCadastro = false) {

    if (this.formulario) {

      this.formulario.patchValue({

        produto: {
          codigo: configuracaoProduto.produto ? configuracaoProduto.produto.codigo : '',
          descricao: configuracaoProduto.produto ? configuracaoProduto.produto.descricao : '',
          codigoProcessoSusep: configuracaoProduto.produto ? configuracaoProduto.produto.codigoProcessoSusep : '',
          versaoProduto: configuracaoProduto.produto ? configuracaoProduto.produto.versaoProduto : '',
          statusDescricao: configuracaoProduto.produto ? configuracaoProduto.produto.statusDescricao : '',
          dataInicioVigencia: configuracaoProduto.produto ? configuracaoProduto.produto.dataInicioVigencia : ''
        },

        versao: configuracaoProduto.versao,
        dataInicioVigencia: configuracaoProduto.dataInicioVigencia,
        indiceReajuste: this.constantesService.getIndiceReajuste(configuracaoProduto.indiceReajuste),
        taxaJurosMora: configuracaoProduto.taxaJurosMora,

        periodicidadeReajuste: this.constantesService.getPeriodicidadeReajuste(configuracaoProduto.periodicidadeReajuste),
        periodicidadeVigencia: this.constantesService.getPeriodicidadeApolice(configuracaoProduto.periodicidadeVigencia),
        qtdPeriodosVigencia: configuracaoProduto.qtdPeriodosVigencia,

        contrataBilhete: this.constantesService.getValorSimNao(configuracaoProduto.contrataBilhete),

        renovacaoAutomatica: this.constantesService.getValorSimNao(configuracaoProduto.renovacaoAutomatica),

        qtdRenovacaoAutomatica: configuracaoProduto.qtdRenovacaoAutomatica,

        recontratacaoAutomatica: this.constantesService.getValorSimNao(configuracaoProduto.recontratacaoAutomatica),
        qtdRecontratacaoAutomatica: configuracaoProduto.qtdRecontratacaoAutomatica,

        moedaPremio: this.constantesService.getMoedaPremio(configuracaoProduto.moedaPremio),
        reenquadramentoPremio: this.constantesService.getValorSimNao(configuracaoProduto.reenquadramentoPremio),
        geraNumeroApoliceOnLine: this.constantesService.getValorSimNao(configuracaoProduto.geraNumeroApoliceOnLine),
        emiteApoliceManualmente: this.constantesService.getValorSimNao(configuracaoProduto.emiteApoliceManualmente),
        possuiAssistencia: this.constantesService.getValorSimNao(configuracaoProduto.possuiAssistencia),
        qtdMinAssistenciaFacultativa: configuracaoProduto.qtdMinAssistenciaFacultativa,
        qtdMaxAssistenciaFacultativa: configuracaoProduto.qtdMaxAssistenciaFacultativa,

        possuiDPS: this.constantesService.getValorSimNao(configuracaoProduto.possuiDPS),
        possuiAcoplados: this.constantesService.getValorSimNao(configuracaoProduto.possuiAcoplados),
        possuiComunicadoVendaPosVenda: this.constantesService.getValorSimNao(configuracaoProduto.possuiComunicadoVendaPosVenda),
        possuiResseguro: this.constantesService.getValorSimNao(configuracaoProduto.possuiResseguro),
        possuiCosseguro: this.constantesService.getValorSimNao(configuracaoProduto.possuiCosseguro),

        // campos readOnly
          dataUltimaAtualizacao: configuracaoProduto.dataUltimaAtualizacao,
          sequencialProduto: configuracaoProduto.sequencialProduto,
          dataAtualizacao: configuracaoProduto.dataAtualizacao,
          codigoSituacaoConfiguracao: configuracaoProduto.codigoSituacaoConfiguracao,
          descricaoSituacaoConfiguracao: configuracaoProduto.descricaoSituacaoConfiguracao,
        // fim campos readOnly

        quantidadeDiasIndenizacao: configuracaoProduto.quantidadeDiasIndenizacao,
        quantidadeDiasSuspensao: configuracaoProduto.quantidadeDiasSuspensao

      });

      if (configuracaoProduto.periodicidadesPagamento && configuracaoProduto.periodicidadesPagamento.length > 0) {
        const periodicidades = configuracaoProduto.periodicidadesPagamento.map(per => this.initPeriodicidadesPagamento(per));
        const periodicidadesFormArray = this.formBuilder.array(periodicidades);
        this.formulario.setControl('periodicidadesPagamento', periodicidadesFormArray);
      }

      if (configuracaoProduto.permissoesVenda && configuracaoProduto.permissoesVenda.length > 0) {
        const permissoes = configuracaoProduto.permissoesVenda.map(per =>
          this.initPermissoesVenda(per, configuracaoProduto.dataInicioVigencia));
        const permissoesFormArray = this.formBuilder.array(permissoes);
        this.formulario.setControl('permissoesVenda', permissoesFormArray);
      }

    } else {

      this.formulario = this.formBuilder.group({

        produto: this.formBuilder.group( {
          codigo: ['',  null],
          descricao: ['', null],
          codigoProcessoSusep: ['', null],
          versaoProduto: ['', null],
          statusDescricao: ['', null],
          dataInicioVigencia: ['', null]
        } ),

        versao: [configuracaoProduto.versao, null],
        dataInicioVigencia: [configuracaoProduto.dataInicioVigencia, Validators.required],
        indiceReajuste: [this.constantesService.getIndiceReajuste(configuracaoProduto.indiceReajuste),
          Validators.required],

        taxaJurosMora: [configuracaoProduto.taxaJurosMora, Validators.required],

        periodicidadeReajuste: [this.constantesService.getPeriodicidadeReajuste(configuracaoProduto.periodicidadeReajuste),
          Validators.required],

        periodicidadeVigencia: [this.constantesService.getPeriodicidadeApolice(configuracaoProduto.periodicidadeVigencia),
          Validators.required],

        qtdPeriodosVigencia: [configuracaoProduto.qtdPeriodosVigencia, Validators.required],

        contrataBilhete: [this.constantesService.getValorSimNao(configuracaoProduto.contrataBilhete),
          Validators.required],

        recontratacaoAutomatica: [this.constantesService.getValorSimNao(configuracaoProduto.recontratacaoAutomatica), Validators.required],

        qtdRecontratacaoAutomatica: [configuracaoProduto.qtdRecontratacaoAutomatica, Validators.required],

        renovacaoAutomatica: [this.constantesService.getValorSimNao(configuracaoProduto.renovacaoAutomatica),
          Validators.required],

        qtdRenovacaoAutomatica: [configuracaoProduto.qtdRenovacaoAutomatica, Validators.required],

        moedaPremio: [this.constantesService.getMoedaPremio(configuracaoProduto.moedaPremio), Validators.required],

        reenquadramentoPremio: [this.constantesService.getValorSimNao(configuracaoProduto.reenquadramentoPremio),
          Validators.required],

        geraNumeroApoliceOnLine: [this.constantesService.getValorSimNao(configuracaoProduto.geraNumeroApoliceOnLine),
          Validators.required],

        emiteApoliceManualmente: [this.constantesService.getValorSimNao(configuracaoProduto.emiteApoliceManualmente),
          Validators.required],

        possuiAssistencia: [this.constantesService.getValorSimNao(configuracaoProduto.possuiAssistencia),
          Validators.required],

        qtdMinAssistenciaFacultativa: [configuracaoProduto.qtdMinAssistenciaFacultativa, Validators.required],

        qtdMaxAssistenciaFacultativa: [configuracaoProduto.qtdMaxAssistenciaFacultativa, Validators.required],

        possuiDPS: [this.constantesService.getValorSimNao(configuracaoProduto.possuiDPS), Validators.required],
        possuiAcoplados: [this.constantesService.getValorSimNao(configuracaoProduto.possuiAcoplados), Validators.required],

        possuiComunicadoVendaPosVenda: [this.constantesService.getValorSimNao(configuracaoProduto.possuiComunicadoVendaPosVenda),
          Validators.required],

        possuiResseguro: [this.constantesService.getValorSimNao(configuracaoProduto.possuiResseguro), Validators.required],
        possuiCosseguro: [this.constantesService.getValorSimNao(configuracaoProduto.possuiCosseguro), Validators.required],

        // campos readOnly
          dataUltimaAtualizacao: ['', null],
          sequencialProduto: ['', null],
          dataAtualizacao: ['', null],
          codigoSituacaoConfiguracao: ['', null],
          descricaoSituacaoConfiguracao: ['', null],
        // fim campos readOnly

        quantidadeDiasIndenizacao: [configuracaoProduto.quantidadeDiasIndenizacao, Validators.required],
        quantidadeDiasSuspensao: [configuracaoProduto.quantidadeDiasSuspensao, Validators.required],

        periodicidadesPagamento: this.formBuilder.array([]),

        permissoesVenda: this.formBuilder.array([]),

      });

      this.utilService.configurarInputData(this.formulario.get('produto'), 'dataInicioVigencia');
      this.utilService.configurarInputData(this.formulario, 'dataInicioVigencia');

      if (isNovoCadastro) {
        this.addPeriodicidadesPagamento();
        this.addPermissoesVenda();
      }

    }

    this.utilService.updateMaterializeTextFields();

  }

  initPeriodicidadesPagamento( periodicidadePagamento: any ) {

    return this.formBuilder.group({
      periodicidadeAgrupada : this.formBuilder.group({

        periodicidade: [periodicidadePagamento && periodicidadePagamento.periodicidadeAgrupada ?
          this.constantesService.getPeriodicidadePagamento( periodicidadePagamento.periodicidadeAgrupada.periodicidade ) : null],

        indicadorVigencia: [ periodicidadePagamento && periodicidadePagamento.periodicidadeAgrupada ?
          this.constantesService.getValorSimNao( periodicidadePagamento.periodicidadeAgrupada.indicadorVigencia) : null,
            Validators.required]

      }),

      periodo: this.formBuilder.group({

        periodicidade: [periodicidadePagamento && periodicidadePagamento.periodo ?
          this.constantesService.getPeriodicidadeApolice( periodicidadePagamento.periodo.periodicidade ) : null],

        quantidade: [periodicidadePagamento && periodicidadePagamento.periodo ?
          periodicidadePagamento.periodo.quantidade : '', Validators.required]
      }),

    });
  }

  addPeriodicidadesPagamento() {
    const control = <FormArray>this.formulario.controls['periodicidadesPagamento'];
    control.push(this.initPeriodicidadesPagamento({}));
  }

  removePeriodicidadesPagamento(i: number) {
    const control = <FormArray>this.formulario.controls['periodicidadesPagamento'];
    control.removeAt(i);
  }

  initPermissoesVenda( permissaoVenda: any, dataInicioVigencia: any) {
    // console.log(permissaoVenda)
    // console.log( dataInicioVigencia );
    return this.formBuilder.group({

      codigo: [permissaoVenda ? permissaoVenda.codigo : '', null],

      parceiro: [permissaoVenda ? this.getParceiro(permissaoVenda.parceiro) : null, Validators.required],

      tipoLocalVenda: [permissaoVenda ?
        this.getTipoLocalVenda(permissaoVenda.tipolocalVenda, permissaoVenda.parceiro, dataInicioVigencia) : null,
        Validators.required],

      indicadorSensibilizado: [permissaoVenda ? this.constantesService.getValorSimNao(permissaoVenda.indicadorSensibilizado) : null,
        Validators.required]
    });
  }

  getParceiro( parceiro ) {
    // console.log(this.parceiroList);
    const a = parceiro ? this.parceiroList.filter(function (el) {
        return el.codigo === parceiro.codigo;
    })[0] : null;
    // console.log(a);
    return a;
  }

  getTipoLocalVenda( tipoLocalVenda, parceiro, dataInicioVigencia ) {
    this.tipoLocalVendaService.list({ codParceiro: parceiro.codigo,
      dataInicioVigencia: dataInicioVigencia }).subscribe( res => {
        return tipoLocalVenda ? res.filter(function (el) {
          return el.codigo === tipoLocalVenda.codigo;
        })[0] : null;
      });
  }

  addPermissoesVenda() {
      const control = <FormArray>this.formulario.controls['permissoesVenda'];
      control.push(this.initPermissoesVenda(null, null));
  }

  removePermissoesVenda(i: number) {
      const control = <FormArray>this.formulario.controls['permissoesVenda'];
      control.removeAt(i);
  }

  onChangeContrataBilhete( selected ) {
    this.isContrataBilhete = false;

    this.formulario.controls['recontratacaoAutomatica'].disable();
    this.formulario.controls['qtdRecontratacaoAutomatica'].disable();

    this.formulario.controls['renovacaoAutomatica'].disable();
    this.formulario.controls['qtdRenovacaoAutomatica'].disable();

    if ( selected ) {
      const contrataBilhete = this.formulario.controls['contrataBilhete'].value;
      this.isContrataBilhete = contrataBilhete.codigo === 'S';
      if ( this.isContrataBilhete ) {
        this.formulario.controls['recontratacaoAutomatica'].enable();
        this.formulario.controls['qtdRecontratacaoAutomatica'].enable();
      } else {
        this.formulario.controls['renovacaoAutomatica'].enable();
        this.formulario.controls['qtdRenovacaoAutomatica'].enable();
      }
    }
  }

  onChangeRecontratacaoAutomatica( selected ) {
    this.isRecontratacaoAutomatica = false;
    this.formulario.controls['qtdRecontratacaoAutomatica'].disable();
    if ( selected ) {
      const recontratacao = this.formulario.controls['recontratacaoAutomatica'].value;
      this.isRecontratacaoAutomatica = recontratacao.codigo === 'S';
      if ( this.isRecontratacaoAutomatica  ) {
        this.formulario.controls['qtdRecontratacaoAutomatica'].enable();
      }
    }
  }

  onChangeRenovacaoAutomatica( selected ) {
    this.isRenovacaoAutomatica = false;
    this.formulario.controls['qtdRenovacaoAutomatica'].disable();
    if ( selected ) {
      const renovacao = this.formulario.controls['renovacaoAutomatica'].value;
      this.isRenovacaoAutomatica = renovacao.codigo === 'S';
      if ( this.isRenovacaoAutomatica  ) {
        this.formulario.controls['qtdRenovacaoAutomatica'].enable();
      }
    }
  }

  onChangePossuiAssistencia( selected ) {
    this.isPossuiAssistencia = false;
    this.formulario.controls['qtdMinAssistenciaFacultativa'].disable();
    this.formulario.controls['qtdMaxAssistenciaFacultativa'].disable();
    if ( selected ) {
      const assisstencia = this.formulario.controls['possuiAssistencia'].value;
      this.isPossuiAssistencia = assisstencia.codigo === 'S';
      if ( this.isPossuiAssistencia ) {
        this.formulario.controls['qtdMinAssistenciaFacultativa'].enable();
        this.formulario.controls['qtdMaxAssistenciaFacultativa'].enable();
      }
    }
  }

  isDataInicioVigenciaPreenchida() {
    return this.formulario.value.dataInicioVigencia !== undefined;
  }

  podeExcluirPeriodicidade() {
    const control = <FormArray>this.formulario.controls['periodicidadesPagamento'];
    return control && control.controls.length > 1;
  }

  podeExcluirPermissaoVenda() {
    const control = <FormArray>this.formulario.controls['permissoesVenda'];
    return control && control.controls.length > 1;
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
    return this.getConfiguracaoProduto().situacao && this.getConfiguracaoProduto().situacao.codigo === '0';
  }

  isSituacaoAprovado() {
    // Codigo situacao = 1 (Registro Aprovado)
    return this.getConfiguracaoProduto().situacao && this.getConfiguracaoProduto().situacao.codigo === '1';
  }

  isSituacaoEncerrado() {
    // Codigo situacao = 2 (Registro Encerrado)
    return this.getConfiguracaoProduto().situacao && this.getConfiguracaoProduto().situacao.codigo === '2';
  }

  isSituacaoVigente() {
    // Codigo situacao = 3 (Registro Vigente)
    return this.getConfiguracaoProduto().situacao && this.getConfiguracaoProduto().situacao.codigo === '3';
  }

  ngOnDestroy() {
    // this.pathSub.unsubscribe();
  }

  getConfiguracaoProduto() {
    return this.formulario.value;
  }

  editarConfiguracaoProduto(configuracaoProduto) {
    this.router.navigate(['/configuracao-produto', configuracaoProduto.codigo, 'versoes', configuracaoProduto.versao, 'editar']);
  }

  gerarVersao(configuracaoProduto) {
    this.router.navigate(['/configuracao-produto', configuracaoProduto.codigo, 'versoes', configuracaoProduto.versao, 'novo']);
  }

  pesquisarConfiguracaoProduto() {
    this.router.navigate(['/configuracao-produto']);
  }

  salvarDadosGerais(aprovar = false) {
    this.mensagemService.limparMensagens();

    if (this.formulario.valid) {

      const configuracaoProduto: any = this.formulario.value;

      if (this.isEdicao() || this.isNovaVersao()) {
        // Eh edicao de Configuração de Produto ou Geração de Nova Versao

        // Se eh aprovacao de uma nova versao de uma Configuração de Produto vigente, deve solicitar uma confirmacao
        // TODO : implentar regra também para quando a aprovacao for posterior ?
        if (this.isNovaVersao() && this.isSituacaoVigente && aprovar) {
          this.mensagemService.enviarMsgConfirm(
            'Ao aprovar você concorda com o encerramento da versão anterior a partir da data de Início de Vigência.'
          + 'Confirmar nova versão da Configuração de Produto?').subscribe( result => {
            if (result) {
              this.update(configuracaoProduto, aprovar);
            }
          });

        // Caso contrario faz o update direto
        } else {
          this.update(configuracaoProduto, aprovar);
        }

      } else if (this.isEncerramento()) {
         // EH Encerramento
         this.mensagemService.enviarMsgConfirm('Deseja confirmar o encerramento da Configuração do Produto?').subscribe( result => {
           if (result) {
              this.configuracaoProdutoService.close(configuracaoProduto).subscribe(res => {
                this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
                this.finalizar(configuracaoProduto);
              });
            }
          });

      } else {
        // EH Criacao (Novo)
        this.configuracaoProdutoService.add(configuracaoProduto, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ?
            'Operação realizada com sucesso!' : 'Cadastro de Configuração de Produto realizado com sucesso!');
          this.finalizar(configuracaoProduto);
        });
      }
    } else {

      this.utilService.validateAllFormFields(this.formulario);
      const invalids = this.utilService.getInvalidControls(this.formulario);

      if (invalids.indexOf('periodicidadesPagamento') >= 0) {
        this.mensagemService.enviarAlerta('Preenchimento da periodicidade de pagamento é obrigatória!');
      }

      if (invalids.indexOf('permissoesVenda') >= 0) {
        this.mensagemService.enviarAlerta('Prenchimento da permissão de venda é obrigatória!');
      }

    }
  }

  update(configuracaoProduto, aprovar) {
    this.configuracaoProdutoService.update(configuracaoProduto, aprovar, this.isNovaVersao()).subscribe(res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      this.finalizar(res);
    });
  }

  finalizar(configuracaoProduto: any = false) {
    this.formulario.markAsPristine();
    if (configuracaoProduto && configuracaoProduto.codigo && configuracaoProduto.versao) {
      this.router.navigate(['/configuracao-produto', configuracaoProduto.codigo, 'versoes', configuracaoProduto.versao]);
    } else {
      this.pesquisarConfiguracaoProduto();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

  onSubmit() { }
}
