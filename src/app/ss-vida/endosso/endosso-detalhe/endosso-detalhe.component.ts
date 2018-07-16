import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';
import { EndossoService } from '../service/endosso.service';

@Component({
  selector: 'app-endosso-detalhe',
  templateUrl: './endosso-detalhe.component.html',
  styleUrls: ['./endosso-detalhe.component.css']
})
export class EndossoDetalheComponent implements OnInit {

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
    private endossoService: EndossoService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      endossoNome: [null, null],
      endossoCpf: [null, null],
      endossoProduto: [null, null],
      endossoApolice: [null, null],
      endossoEndosso: [null, null],
      endossoSituacaoCodigo: [null, null],
      endossoSituacao: [null, null],
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
      produtoDataEndosso: [null, null],
      produtoDataCadastro: [null, null],
      produtoDataPagamento: [null, null],
      produtoProximaRenovacao: [null, null],
      produto: [null, null],
      produtoApolice: [null, null],
      produtoEndosso: [null, null],
      produtoSituacao: [null, null],
      produtoPeriodoVigencia: [null, null],
      produtoVigencia: [null, null],
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
      this.endossoService.get( codigo ).subscribe( res => {
        this.preencherFormulario( res );
      });
    });
  }

  preencherFormulario( endosso: any ) {
    this.formulario.patchValue( {
      endossoNome: endosso.pessoa.nome,
      endossoCpf: endosso.pessoa.cpfCnpj,
      endossoProduto: endosso.produto.codigo + ' - ' + endosso.produto.descricao,
      endossoApolice: endosso.numeroApolice,
      endossoEndosso: endosso.numeroEndossoExterna,
      endossoSituacaoCodigo: endosso.situacaoEndosso.codigo,
      endossoSituacao: endosso.situacaoEndosso.descricao,
      clienteNome: endosso.pessoa.nome,
      clienteCpf: endosso.pessoa.cpfCnpj,
      clienteSexo: endosso.pessoa.sexo.descricao,
      clienteEstadoCivil: endosso.pessoa.estadoCivil.descricao,
      clienteDataNascimento: this.utilService.formatarDataVisao( endosso.pessoa.dataNascimento ),
      clienteNumeroRg: endosso.pessoa.numeroIdentidade,
      clienteDataExpedicao: this.utilService.formatarDataVisao( endosso.pessoa.dataExpedicaoIdentidade ),
      clienteOrgaoEmissor: endosso.pessoa.orgaoExpedicaoIdentidade,
      clienteUfIdentidade: endosso.pessoa.codigoUfIdentidade,
      clienteNacionalidade: endosso.pessoa.nacionalidade.descricao,
      clienteResideBrasil: endosso.pessoa.residenteBrasil,
      clienteProfissao: endosso.pessoa.profissao.codigo + ' - ' + endosso.pessoa.profissao.descricao,
      faixaDeRendaIndividual: endosso.pessoa.faixaRendaIndividual.descricao,
      faixaDeRendaFamiliar: endosso.pessoa.faixaRendaFamiliar.descricao,
      contatoEndereco: endosso.pessoa.endereco.logradouro,
      contatoComplemento: endosso.pessoa.endereco.complemento,
      contatoBairro: endosso.pessoa.endereco.bairro,
      contatoCep: endosso.pessoa.endereco.cep,
      contatoCidade: endosso.pessoa.endereco.cidade,
      contatoCelular: endosso.pessoa.telefoneCelular.numero,
      contatoResidencial: endosso.pessoa.telefoneResidencial.numero,
      contatoComercial:  endosso.pessoa.telefoneComercial.numero,
      contatoEmailPrincipal: endosso.pessoa.emailPrincipal.email,
      contatoAutorizoComunicacaoPor: ( endosso.pessoa.endereco.indicativoAutorizacaoComunicacao === 'S' ? 'Impresso / ' : '' )
                                   + ( endosso.pessoa.telefoneCelular.indicativoAutorizacaoComunicacao === 'S' ? 'SMS / ' : '' )
                                   + ( endosso.pessoa.emailPrincipal.indicativoAutorizacaoComunicacao === 'S' ? 'E-Mail' : '' ),
      produtoDataEndosso: this.utilService.formatarDataVisao( endosso.dataEndosso ),
      produtoDataCadastro: this.utilService.formatarDataVisao( endosso.dataCadastro ),
      produtoDataPagamento: this.utilService.formatarDataVisao( endosso.dataPagamento ),
      produtoProximaRenovacao: this.utilService.formatarDataVisao( endosso.dataProximaRenovacao ),
      produto: endosso.produto.codigo + ' - ' + endosso.produto.descricao,
      produtoApolice: endosso.numeroApolice,
      produtoEndosso: endosso.numeroEndossoExterna,
      produtoSituacao: endosso.situacaoEndosso.descricao,
      produtoPeriodoVigencia: this.utilService.formatarDataVisao( endosso.produto.dataInicioVigencia ),
      produtoVigencia: endosso.vigencia.descricao,
      produtoTipoSeguro: endosso.tipoSeguro,
      dadosVendaParceiro: endosso.venda.parceiro.descricao,
      dadosVendaTipoLocalVenda: endosso.venda.tipoLocalVenda.descricao,
      dadosVendaLocalVenda: endosso.venda.localVenda.descricao,
      dadosVendaFilial: endosso.venda.filial.descricao,
      dadosIndicador: endosso.venda.indicador.nome,
      parcelaAdesaoTipoPagamento: endosso.parcelaAdesao.formaCobrancaEndosso.formaCobranca.descricao,
      parcelaAdesaoConvenio: endosso.parcelaAdesao.convenioCobrancaEndosso.convenioCobranca.descricao,
      parcelaAdesaoValor: this.utilService.formatarValorRealVisao( endosso.parcelaAdesao.valorParcela ),
      parcelaAdesaoDataPagamento: this.utilService.formatarDataVisao( endosso.parcelaAdesao.dataPagamento ),
      parcelaAdesaoBanco: endosso.parcelaAdesao.banco.codigo,
      parcelaAdesaoAgencia: endosso.parcelaAdesao.codigoAgencia,
      parcelaAdesaoNumeroConta: endosso.parcelaAdesao.numeroConta,
      parcelaAdesaoOperacao: endosso.parcelaAdesao.codigoOperacao,
      parcelaAdesaoCartaoCredito: endosso.parcelaAdesao.numeroCartao,
      parcelaAdesaoSituacao: endosso.parcelaAdesao.descricaoSituacao,
      demaisParcelasTipoPagamento: endosso.demaisParcelas.formaCobrancaEndosso.formaCobranca.descricao,
      demaisParcelasConvenio: endosso.demaisParcelas.convenioCobrancaEndosso.convenioCobranca.descricao,
      demaisParcelasPeriodicidadePagamento: endosso.demaisParcelas.periodicidadePagamento.descricao,
      demaisParcelasDiaDebito: endosso.demaisParcelas.diaDebito,
      demaisParcelasCodBanco: endosso.demaisParcelas.banco.codigo,
      demaisParcelasAgencia: endosso.demaisParcelas.codigoAgencia,
      demaisParcelasNumeroConta: endosso.demaisParcelas.numeroConta,
      demaisParcelasOperacao: endosso.demaisParcelas.codigoOperacao,
      demaisParcelasValor: this.utilService.formatarValorRealVisao( endosso.demaisParcelas.valorParcela ),
      demaisParcelasCartaoCredito: endosso.demaisParcelas.numeroCartao,
    } );
    this.beneficiarios = endosso.beneficiarios;
    this.coberturas = endosso.coberturas;
    this.assistencias = endosso.assistencias;

    Object.keys( this.formulario.controls ).forEach( key => {
      this.formulario.controls[ key ].disable();
    } );
  }

  isEndossoDeclinavel() {
    const endosso = this.formulario.value;
    // status declinaveis:
    // TODO: posteriormente esta informacao estará em um campo dentro da Situacao da Endosso
    // PENDENTE DE PAGAMENTO = 1
    // PENDENTE DE ANÁLISE TÉCNICA = 2
    // LIBERADA PARA EMISSÃO = 3
    // CONCILIADA = 13
    // EM ANÁLISE DE CRIVO = 17
    return [1, 2, 3, 13, 17].includes(endosso.endossoSituacaoCodigo);
  }

  voltar() {
    this.router.navigate( [ '/endosso' ] );
  }

  historico( e: any ) {
    this.router.navigate( [ `/endosso/${e.endossoEndosso}/historico-seguro` ] );
  }

  declinar( e: any ) {
    this.router.navigate( [ `/endosso/${e.endossoEndosso}/declinar` ] );
  }

}
