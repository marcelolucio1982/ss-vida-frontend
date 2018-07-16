import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';
import { PropostaService } from '../service/proposta.service';

@Component({
  selector: 'app-proposta-detalhe',
  templateUrl: './proposta-detalhe.component.html',
  styleUrls: ['./proposta-detalhe.component.css']
})
export class PropostaDetalheComponent implements OnInit {

  public formulario: FormGroup;

  public beneficiarios: any = false;
  public coberturas: any = false;
  public assistencias: any = false;

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
      propostaNome: [null, null],
      propostaCpf: [null, null],
      propostaProduto: [null, null],
      propostaApolice: [null, null],
      propostaProposta: [null, null],
      propostaSituacaoCodigo: [null, null],
      propostaSituacao: [null, null],
      clienteNome: [null, null],
      clienteCpf: [null, null],
      clienteSexo: [null, null],
      clienteEstadoCivil: [null, null],
      clienteDataNascimento: [null, null],
      clienteNumeroRg: [null, null],
      clienteDataExpedicao: [null, null],
      clienteOrgaoEmissor: [null, null],
      clienteUfIdentidade: [null, null],
      clienteNacionalidade: [null, null],
      clienteResideBrasil: [null, null],
      clienteProfissao: [null, null],
      faixaDeRendaIndividual: [null, null],
      faixaDeRendaFamiliar: [null, null],
      contatoEndereco: [null, null],
      contatoComplemento: [null, null],
      contatoBairro: [null, null],
      contatoCep: [null, null],
      contatoCidade: [null, null],
      contatoCelular: [null, null],
      contatoResidencial: [null, null],
      contatoComercial: [null, null],
      contatoEmailPrincipal: [null, null],
      contatoAutorizoComunicacaoPor: [null, null],
      produtoDataProposta: [null, null],
      produtoDataCadastro: [null, null],
      produtoDataPagamento: [null, null],
      produtoProximaRenovacao: [null, null],
      produto: [null, null],
      produtoApolice: [null, null],
      produtoProposta: [null, null],
      produtoSituacao: [null, null],
      produtoPeriodoVigencia: [null, null],
      produtoVigencia: [null, null],
      produtoValorPremioTotal: [null, null],
      produtoValorPremioBruto: [null, null],
      produtoValorIOF: [null, null],
      produtoValorSorteio: [null, null],
      produtoTipoSeguro: [null, null],
      dadosVendaParceiro: [null, null],
      dadosVendaTipoLocalVenda: [null, null],
      dadosVendaLocalVenda: [null, null],
      dadosVendaFilial: [null, null],
      dadosIndicador: [null, null],
      parcelaAdesaoTipoPagamento: [null, null],
      parcelaAdesaoConvenio: [null, null],
      parcelaAdesaoValor: [null, null],
      parcelaAdesaoDataPagamento: [null, null],
      parcelaAdesaoBanco: [null, null],
      parcelaAdesaoAgencia: [null, null],
      parcelaAdesaoNumeroConta: [null, null],
      parcelaAdesaoOperacao: [null, null],
      parcelaAdesaoCartaoCredito: [null, null],
      parcelaAdesaoSituacao: [null, null],
      demaisParcelasTipoPagamento: [null, null],
      demaisParcelasConvenio: [null, null],
      demaisParcelasPeriodicidadePagamento: [null, null],
      demaisParcelasDiaDebito: [null, null],
      demaisParcelasCodBanco: [null, null],
      demaisParcelasAgencia: [null, null],
      demaisParcelasNumeroConta: [null, null],
      demaisParcelasOperacao: [null, null],
      demaisParcelasValor: [null, null],
      demaisParcelasCartaoCredito: [null, null],
    });

    this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      this.propostaService.get( codigo ).subscribe( res => {
        this.preencherFormulario( res );
      });
    });
  }

  preencherFormulario( proposta: any ) {
    this.formulario.patchValue( {
      propostaNome: proposta.pessoa.nome,
      propostaCpf: proposta.pessoa.cpfCnpj,
      propostaProduto: proposta.produto.codigo + ' - ' + proposta.produto.descricao,
      propostaApolice: proposta.numeroApolice,
      propostaProposta: proposta.numeroPropostaExterna,
      propostaSituacaoCodigo: proposta.situacaoProposta.codigo,
      propostaSituacao: proposta.situacaoProposta.descricao,
      clienteNome: proposta.pessoa.nome,
      clienteCpf: proposta.pessoa.cpfCnpj,
      clienteSexo: proposta.pessoa.sexo.descricao,
      clienteEstadoCivil: proposta.pessoa.estadoCivil.descricao,
      clienteDataNascimento: this.utilService.formatarDataVisao( proposta.pessoa.dataNascimento ),
      clienteNumeroRg: proposta.pessoa.numeroIdentidade,
      clienteDataExpedicao: this.utilService.formatarDataVisao( proposta.pessoa.dataExpedicaoIdentidade ),
      clienteOrgaoEmissor: proposta.pessoa.orgaoExpedicaoIdentidade,
      clienteUfIdentidade: proposta.pessoa.codigoUfIdentidade,
      clienteNacionalidade: proposta.pessoa.nacionalidade.descricao,
      clienteResideBrasil: proposta.pessoa.residenteBrasil,
      clienteProfissao: proposta.pessoa.profissao.codigo + ' - ' + proposta.pessoa.profissao.descricao,
      faixaDeRendaIndividual: proposta.pessoa.faixaRendaIndividual.descricao,
      faixaDeRendaFamiliar: proposta.pessoa.faixaRendaFamiliar.descricao,
      contatoEndereco: proposta.pessoa.endereco.logradouro,
      contatoComplemento: proposta.pessoa.endereco.complemento,
      contatoBairro: proposta.pessoa.endereco.bairro,
      contatoCep: proposta.pessoa.endereco.cep,
      contatoCidade: proposta.pessoa.endereco.cidade,
      contatoCelular: proposta.pessoa.telefoneCelular.numero,
      contatoResidencial: proposta.pessoa.telefoneResidencial.numero,
      contatoComercial:  proposta.pessoa.telefoneComercial.numero,
      contatoEmailPrincipal: proposta.pessoa.emailPrincipal.email,
      contatoAutorizoComunicacaoPor: ( proposta.pessoa.endereco.indicativoAutorizacaoComunicacao === 'S' ? 'Impresso / ' : '' )
                                   + ( proposta.pessoa.telefoneCelular.indicativoAutorizacaoComunicacao === 'S' ? 'SMS / ' : '' )
                                   + ( proposta.pessoa.emailPrincipal.indicativoAutorizacaoComunicacao === 'S' ? 'E-Mail' : '' ),
      produtoDataProposta: this.utilService.formatarDataVisao( proposta.dataProposta ),
      produtoDataCadastro: this.utilService.formatarDataVisao( proposta.dataCadastro ),
      produtoDataPagamento: this.utilService.formatarDataVisao( proposta.dataPagamento ),
      produtoProximaRenovacao: this.utilService.formatarDataVisao( proposta.dataProximaRenovacao ),
      produto: proposta.produto.codigo + ' - ' + proposta.produto.descricao,
      produtoApolice: proposta.numeroApolice,
      produtoProposta: proposta.numeroPropostaExterna,
      produtoSituacao: proposta.situacaoProposta.descricao,
      produtoPeriodoVigencia: this.utilService.formatarDataVisao( proposta.produto.dataInicioVigencia ),
      produtoVigencia: proposta.vigencia.descricao,
      produtoValorPremioTotal: this.utilService.formatarValorRealVisao( proposta.premioTotal ),
      produtoValorPremioBruto: this.utilService.formatarValorRealVisao( proposta.premioBruto ),
      produtoValorIOF: this.utilService.formatarValorRealVisao( proposta.valorIof ),
      produtoValorSorteio: this.utilService.formatarValorRealVisao( proposta.acoplados[0] ? proposta.acoplados[0].vlrSorteio : 0),
      produtoTipoSeguro: proposta.tipoSeguro,
      dadosVendaParceiro: proposta.venda.parceiro.descricao,
      dadosVendaTipoLocalVenda: proposta.venda.tipoLocalVenda.descricao,
      dadosVendaLocalVenda: proposta.venda.localVenda.descricao,
      dadosVendaFilial: proposta.venda.filial.descricao,
      dadosIndicador: proposta.venda.indicador.nome,
      parcelaAdesaoTipoPagamento: proposta.parcelaAdesao.formaCobrancaProposta.formaCobranca.descricao,
      parcelaAdesaoConvenio: proposta.parcelaAdesao.convenioCobrancaProposta.convenioCobranca.descricao,
      parcelaAdesaoValor: this.utilService.formatarValorRealVisao( proposta.parcelaAdesao.valorParcela ),
      parcelaAdesaoDataPagamento: this.utilService.formatarDataVisao( proposta.parcelaAdesao.dataPagamento ),
      parcelaAdesaoBanco: proposta.parcelaAdesao.banco.codigo,
      parcelaAdesaoAgencia: proposta.parcelaAdesao.codigoAgencia,
      parcelaAdesaoNumeroConta: proposta.parcelaAdesao.numeroConta,
      parcelaAdesaoOperacao: proposta.parcelaAdesao.codigoOperacao,
      parcelaAdesaoCartaoCredito: proposta.parcelaAdesao.numeroCartao,
      parcelaAdesaoSituacao: proposta.parcelaAdesao.descricaoSituacao,
      demaisParcelasTipoPagamento: proposta.demaisParcelas.formaCobrancaProposta.formaCobranca.descricao,
      demaisParcelasConvenio: proposta.demaisParcelas.convenioCobrancaProposta.convenioCobranca.descricao,
      demaisParcelasPeriodicidadePagamento: proposta.demaisParcelas.periodicidadePagamento.descricao,
      demaisParcelasDiaDebito: proposta.demaisParcelas.diaDebito,
      demaisParcelasCodBanco: proposta.demaisParcelas.banco.codigo,
      demaisParcelasAgencia: proposta.demaisParcelas.codigoAgencia,
      demaisParcelasNumeroConta: proposta.demaisParcelas.numeroConta,
      demaisParcelasOperacao: proposta.demaisParcelas.codigoOperacao,
      demaisParcelasValor: this.utilService.formatarValorRealVisao( proposta.demaisParcelas.valorParcela ),
      demaisParcelasCartaoCredito: proposta.demaisParcelas.numeroCartao,
    } );
    this.beneficiarios = proposta.beneficiarios;
    this.coberturas = proposta.coberturas;
    this.assistencias = proposta.assistencias;

    Object.keys( this.formulario.controls ).forEach( key => {
      this.formulario.controls[ key ].disable();
    } );
  }

  isPropostaDeclinavel() {
    const proposta = this.formulario.value;
    // status declinaveis:
    // TODO: posteriormente esta informacao estará em um campo dentro da Situacao da Proposta
    // PENDENTE DE PAGAMENTO = 1
    // PENDENTE DE ANÁLISE TÉCNICA = 2
    // LIBERADA PARA EMISSÃO = 3
    // CONCILIADA = 13
    // EM ANÁLISE DE CRIVO = 17
    return [1, 2, 3, 13, 17].includes(proposta.propostaSituacaoCodigo);
  }

  voltar() {
    this.router.navigate( [ '/proposta' ] );
  }

  historicoSeguro( e: any ) {
    this.router.navigate( [ `/historico/historico-seguro/${e.propostaProposta}` ],
                          { queryParams: { title: 'Histórico do Seguro', voltar: `/proposta/${e.propostaProposta}` }} );
  }

  historicoAsegurado( e: any ) {
    this.router.navigate( [ `/historico/historico-segurado/${e.propostaProposta}` ],
                          { queryParams: { title: 'Histórico do Seguro', voltar: `/proposta/${e.propostaProposta}` }} );
  }

  produtosSegurado( e: any ) {
    this.router.navigate( [ `/historico/produtos-segurado/` +
    `${e.propostaProposta}/` +
    `${e.propostaCpf}` ],
    { queryParams: { title: 'Produtos do Segurado', voltar: `/proposta/${e.propostaProposta}` }} );
  }

  declinar( e: any ) {
    this.router.navigate( [ `/proposta/${e.propostaProposta}/declinar` ] );
  }

}
