import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfiguracaoProdutoService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('parametrizacao/produtos', filtro);
  }

  public get(configuracaoProduto: any): Observable<any[]> {
    return this.servico.get(`parametrizacao/produtos/${configuracaoProduto.produto.codigo}`
    + `/configuracoes/${configuracaoProduto.produto.versao}`, {isDetalhado: true});
  }

  public listCoberturas( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/coberturas` );
  }

  public getCoberturaDetalhe( codigoProduto: number, versaoProduto: number, codigoCobertura: number ): Observable<any> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/coberturas/${codigoCobertura}` );
  }

  public listAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/assistencias` );
  }

  public listAssistenciasDetalhe( codigoProduto: number, versaoProduto: number,
                                  codigoParceiro: number, codigoTipoLocalVenda: number,
                                  dataInicioVigenciaTipoLocalVenda: String ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/assistencias`,
                            { 'codigoParceiro': codigoParceiro,
                              'codigoTipoLocalVenda': codigoTipoLocalVenda,
                              'dataInicioVigenciaTipoLocalVenda': dataInicioVigenciaTipoLocalVenda } );
  }

  public listAcoplados( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/acoplados` );
  }

  public listAcopladosDetalhe( codigoProduto: number, versaoProduto: number,
                               codigoParceiro: number, codigoTipoLocalVenda: number,
                               dataInicioVigenciaTipoLocalVenda: String ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/acoplados`,
                            { 'codigoParceiro': codigoParceiro,
                              'codigoTipoLocalVenda': codigoTipoLocalVenda,
                              'dataInicioVigenciaTipoLocalVenda': dataInicioVigenciaTipoLocalVenda } );
  }

  public listComissoes( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/comissoes` );
  }

  public listComissoesDetalhe( codigoProduto: number, versaoProduto: number,
                               codigoComissao: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/comissoes/${codigoComissao}` );
  }

  public listCobranca( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/cobrancas` );
  }

  public listCobrancasDetalhe( codigoProduto: number, versaoProduto: number,
                               codigoCobranca: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/produtos/${codigoProduto}/configuracoes/${versaoProduto}/cobrancas/${codigoCobranca}` );
  }

  public listParceiros( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/dominio-parceiros`, { 'todos': true } );
  }

  public listTipoLocalDeVenda( codigoProduto: number, versaoProduto: number,
                               codigoParceiro: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/parceiros/${codigoParceiro}/dominio-tipos-local-venda`, { 'todos': true } );
  }

  public listDominioAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/dominio-assistencias` );
  }

  public listDominioEmpresaAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/dominio-empresas-assistencias` );
  }

  public listDominioAcionamentoAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/acionamento-assistencia` );
  }

  public listDominioEventoAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/evento-assistencia` );
  }

  public listDominioBeneficiarioAssistencias( codigoProduto: number, versaoProduto: number ): Observable<any[]> {
    return this.servico.get( `parametrizacao/dominios-produtos/${codigoProduto}/configuracoes/${versaoProduto}` +
                             `/beneficiario-assistencia` );
  }

  public listFormasContratacao(): Observable<any[]> {
    return this.servico.get( `vida/formas-contratacao` );
  }

  public add(configuracaoProduto: any, aprove = false): Observable<any[]> {
    return this.servico.post(`parametrizacao/produtos/${configuracaoProduto.produto.codigo}/configuracoes`, configuracaoProduto);
  }

  public update(configuracaoProduto: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
      configuracaoProduto.dataAtualizacao = '';
    }
    return this.servico.put(`parametrizacao/produtos/${configuracaoProduto.codigo}?acao=` + (aprove ? 'A' : 'S'), configuracaoProduto);
  }

  public aprove(configuracaoProduto: any): Observable<any[]> {
    return this.servico.put(`parametrizacao/produtos/${configuracaoProduto.codigo}?acao=A`, configuracaoProduto);
  }

  public close(configuracaoProduto: any): Observable<any[]> {
    return this.servico.put(`parametrizacao/produtos/${configuracaoProduto.codigo}`
    + `/versoes/${configuracaoProduto.versao}/encerrar`, configuracaoProduto);
  }

  public delete(configuracaoProduto: any): Observable<any[]> {
    return this.servico.delete(`parametrizacao/produtos/${configuracaoProduto.codigo}`
    + `/versoes/${configuracaoProduto.versao}/atualizacao/${configuracaoProduto.dataAtualizacao}`);
  }

  public emitir(codigoProduto: any, codigoCobertura: any , aprove = false): Observable<any[]> {
    return this.servico.post(`parametrizacao/produtos/${codigoProduto}/${codigoCobertura}/emitir`, );
  }

}
