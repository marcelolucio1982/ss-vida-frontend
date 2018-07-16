import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UtilService } from './util.service';
import { Observable } from 'rxjs/Rx';

// Fonte: https://embed.plnkr.co/plunk/oA2Day
@Injectable()
export class ConstantesService {

  private formatoData = 'dd/mm/yyyy';
  private formatoDataP = 'dd/MM/yyyy';

  private datePickerConfig = {
    monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekdaysLetter: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    format: 'dd/mm/yyyy',
    today: 'Hoje',
    clear: 'Limpar',
    close: 'Pronto',
    labelMonthNext: 'Próximo mês',
    labelMonthPrev: 'Mês anterior',
    labelMonthSelect: 'Selecione um mês',
    labelYearSelect: 'Selecione um ano',
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    closeOnSelect: false, // Close upon selecting a date,
    //onStart: () => {},
    // onRender: () => {},
    // onClose: () => {},
    // onSet: () => {},
    // onStop: () => {},
    onOpen: function(a, b, c) {
      if (this.$node.hasClass('pickadate-readonly')) {
        this.close();
      }
    }
  };

  private valoresSimNao: any;

  private situacoes: any;

  private indicesReajuste: any;

  private moedasPremio: any;

  private periodicidadesReajuste: any;

  private periodicidadesApolice: any;

  private periodicidadesPagamento: any;

  private tiposSegurados;

  private gruposSusep: any;

  private ramosSusep: any = {0: []};

  private unidadesNegocio: any;

  private unidadeFederacaoList: any;

  private parceiros: any;

  private tiposVendedores: any;

  private motivosDeclinioProposta: any;

  private formasDevolucaoProposta: any;

  private listaBancos: any;

  private operacoesCaixa: any;

  private listaTipoTelefones: any;

  private parentescos: any;

  private generos: any = [
    {codigo: "M", descricao:"Masculino"}, 
    {codigo: "F", descricao:"Feminino"}
  ];

  private tiposBeneficiarios: any = [
    { 'codigo': 'S', 'descricao': 'Segurado' },
    { 'codigo': 'B', 'descricao': 'Beneficiários' }
  ];

  private maskDef: any = {
    'numerico': function(qtde = 1) {
      return {
        'mask': Array.apply(null, {length: qtde}).map(function() { return /\d/; }),
        guide: false
      };
    },
    'alfaNumerico': function(qtde = 1) {
      return {
        'mask': Array.apply(null, {length: qtde}).map(function() { return /[A-ZÀ-Úa-za-zà-ú0-9 _]/; }),
        guide: false
      };
    },
    'alfaNumericoSimples': function(qtde = 1) {
      return {
        'mask': Array.apply(null, {length: qtde}).map(function() { return /[A-Za-z0-9]/; }),
        guide: false
      };
    }
  };

  constructor(private servico: HttpService, private utilService: UtilService) {
    const ramosSusep = this.ramosSusep;
    servico.get('vida/grupos-susep').subscribe(res => {
      res['data'].map(function(e) {
        servico.get('vida/ramos-susep', {codigoGrupoSusep: e.codigo}).subscribe(ret => {
          ramosSusep[e.codigo] = ret['data'];
        });
      });
      this.gruposSusep = res['data'];
    });

    servico.get('vida/unidades-negocio').subscribe(res => {
      this.unidadesNegocio = res['data'];
    });

    servico.get('comum/indicadores-sim-nao').subscribe(res => {
      this.valoresSimNao = res['data'];
    });

    servico.get('vida/situacoes').subscribe(res => {
      this.situacoes = res['data'];
    });

    servico.get('corporativo/seguros/moedas', { tipoMoeda: 2 }).subscribe(res => {
      this.indicesReajuste = res;
    });

    servico.get('corporativo/seguros/moedas', { tipoMoeda: 1 }).subscribe(res => {
      this.moedasPremio = res;
    });

    servico.get('vida/periodicidades-reajuste').subscribe(res => {
      this.periodicidadesReajuste = res['data'];
    });

    servico.get('vida/periodicidades-vigencia-apolice').subscribe(res => {
      this.periodicidadesApolice = res['data'];
    });

    servico.get('vida/periodicidades-pagamento').subscribe(res => {
      this.periodicidadesPagamento = res['data'];
    });

    servico.get('vida/coberturas/tipos-segurado').subscribe(res => {
      this.tiposSegurados = res;
    });

    servico.get('corporativo/unidades-federacao').subscribe(res => {
      this.unidadeFederacaoList = res;
    });

    servico.get( `corporativo/estrutura-comercial/parceiros` ).subscribe(res => {
      this.parceiros = res;
    });

    servico.get( `corporativo/estrutura-comercial/tipos-vendedor`, {vigentes: true} ).subscribe(res => {
      this.tiposVendedores = res;
    });

    servico.get( `vida/motivos-declinio`).subscribe(res => {
      this.motivosDeclinioProposta = res['data'];
    });

    servico.get( `vida/formas-devolucao`).subscribe(res => {
      this.formasDevolucaoProposta = res['data'];
    });

    servico.get( `corporativo/seguros/bancos`).subscribe(res => {
      this.listaBancos = res['data'];
    });

    servico.get( `vida/operacoes-caixa`).subscribe(res => {
      this.operacoesCaixa = res['data'];
    });

    servico.get( `corporativo/tipo-telefones`).subscribe(res => {
      this.listaTipoTelefones = res;
    });

    servico.get( `vida/parentescos`).subscribe(res => {
      this.parentescos = res['data'];
    });
  }

  getFormatoData() {
    return this.formatoData;
  }

  getFormatoDataP() {
    return this.formatoDataP;
  }

  getDatePickerConfig() {
    return this.datePickerConfig;
  }

  getValoresSimNao() {
    return this.valoresSimNao;
  }

  getValorSimNao(obj) {
    return obj ? this.valoresSimNao.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getSituacoes() {
    return this.situacoes;
  }

  getSituacao(obj) {
    return obj ? this.situacoes.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getPeriodicidadeReajuste(obj) {
    return obj ? this.periodicidadesReajuste.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getPeriodicidadesReajuste() {
    return this.periodicidadesReajuste;
  }

  getPeriodicidadeApolice(obj) {
    return obj ? this.periodicidadesApolice.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getPeriodicidadesApolice() {
    return this.periodicidadesApolice;
  }

  getPeriodicidadePagamento(obj) {
    return obj ? this.periodicidadesPagamento.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getPeriodicidadesPagamento() {
    return this.periodicidadesPagamento;
  }

  getIndicesReajuste() {
    return this.indicesReajuste;
  }

  getIndiceReajuste(obj) {
    return obj ? this.indicesReajuste.filter(function (el) {
      return el.codigoMoeda === obj.codigoMoeda;
    })[0] : null;
  }

  getMoedasPremio() {
    return this.moedasPremio;
  }

  getMoedaPremio(obj) {
    return obj ? this.moedasPremio.filter(function (el) {
      return el.codigoMoeda === obj.codigoMoeda;
    })[0] : null;
  }

  getTiposSegurados() {
    return this.tiposSegurados;
  }

  getTipoSegurado(obj) {
    return obj ? this.tiposSegurados.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getTiposBeneficiarios() {
    return this.tiposBeneficiarios;
  }

  getTipoBeneficiario(obj) {
    return obj ? this.tiposBeneficiarios.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getMaskDef() {
    return this.maskDef;
  }

  getGruposSusep() {
    return this.gruposSusep;
  }

  getRamosSusep(codigoGrupo) {
    return codigoGrupo ? this.ramosSusep[codigoGrupo] : this.ramosSusep[0];
  }

  getUnidadesNegocio() {
    return this.unidadesNegocio;
  }

  getUnidadeFederacao( sigla ) {
    return sigla ? this.unidadeFederacaoList.filter(function (el) {
      return el.sigla === sigla;
    })[0] : null;
  }

  findUnidadeFederacao() {
    return this.unidadeFederacaoList;
  }

  getParceiro( obj ) {
    return obj ? this.parceiros.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getParceiros() {
    return this.parceiros;
  }

  getTipoVendedor( obj ) {
    return obj ? this.tiposVendedores.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getTiposVendedores() {
    return this.tiposVendedores;
  }

  getEnderecoByCep( cep ): Observable<any[]>  {
    return this.servico.get( 'corporativo/cep/' + cep );
  }

  getPessoaJuridica( cnpj ): Observable<any[]>  {
    return this.servico.get( 'corporativo/pessoas-juridicas/' + cnpj );
  }

  getPessoaFisica( cpf ): Observable<any[]>  {
    return this.servico.get( 'corporativo/pessoas-fisicas/' + cpf );
  }

  getContato( codigoPessoa: number, ultimoRegistro: boolean ): Observable<any[]> {
    return this.servico.get( `corporativo/pessoa-contatos`, { 'codigoPessoa': codigoPessoa, 'ultimoRegistro': ultimoRegistro } );
  }

  getDocumentosIdentidade( codigoPessoa: number, ultimoRegistro: boolean ): Observable<any[]>  {
    return this.servico.get( `corporativo/pessoa-documentos-identidades`,
                            { 'codigoPessoa': codigoPessoa, 'ultimoRegistro': ultimoRegistro } );
  }

  getTelefones( codigoPessoa: number, ultimoRegistro: boolean ): Observable<any[]>  {
    return this.servico.get( `corporativo/pessoa-telefones`, { 'codigoPessoa': codigoPessoa, 'ultimoRegistro': ultimoRegistro } );
  }

  getEnderecos( codigoPessoa: number, ultimoRegistro: boolean ): Observable<any[]>  {
    return this.servico.get( `corporativo/pessoa-enderecos`, { 'codigoPessoa': codigoPessoa, 'ultimoRegistro': ultimoRegistro } );
  }

  findEnderecos( cpf: string ): Observable<any[]>  {
    return this.servico.get( `vida/pessoa/${cpf}/enderecos` );
  }

  findTelefones( cpf: string ): Observable<any[]>  {
    return this.servico.get( `vida/pessoa/${cpf}/telefones` );
  }

  findEmails( cpf: string ): Observable<any[]>  {
    return this.servico.get( `vida/pessoa/${cpf}/emails` );
  }

  getMotivosDeclinioProposta() {
    return this.motivosDeclinioProposta;
  }

  getMotivoDeclinioProposta(obj) {
    return obj ? this.motivosDeclinioProposta.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getFormasDevolucaoProposta() {
    return this.formasDevolucaoProposta;
  }

  getFormaDevolucaoProposta(obj) {
    return obj ? this.formasDevolucaoProposta.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getListaBancos() {
    return this.listaBancos;
  }

  getBanco(obj) {
    return obj ? this.listaBancos.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  getOperacoesCaixa() {
    return this.operacoesCaixa;
  }

  getOperacaoCaixa(obj) {
    return obj ? this.operacoesCaixa.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  findPep( cpfCnpj ): Observable<any[]> {
    return this.servico.get( 'corporativo/pep', { 'cpfCnpj': cpfCnpj } );
  }

  findNlist( cpfCnpj ): Observable<any[]> {
    return this.servico.get( 'corporativo/nlist', { 'cpfCnpj': cpfCnpj } );
  }

  findTipoTelefones() {
    return this.listaTipoTelefones;
  }

  getTipoTelefone( filtro ) {
    let result = this.listaTipoTelefones.filter(function (el) {
      return el.codigo === filtro;
    });
    if ( ! result ) {
      result = this.listaTipoTelefones.filter(function (el) {
        return el.descricao === filtro;
      });
    }
    return null;
  }

  findParentescos() {
    return this.parentescos;
  }

  getParentesco(obj) {
    return obj ? this.parentescos.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

  findGeneros() {
    return this.generos;
  }

  getGenero(obj) {
    return obj ? this.generos.filter(function (el) {
      return el.codigo === obj.codigo;
    })[0] : null;
  }

}
