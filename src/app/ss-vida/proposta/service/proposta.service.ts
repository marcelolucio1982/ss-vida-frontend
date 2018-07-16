import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { UtilService } from '../../shared/services/util.service';

@Injectable()
export class PropostaService {

  constructor(
    private servico: HttpService,
    public utilService: UtilService
  ) { }

  public findSituacoesProposta(): Observable<any[]> {
    return this.servico.get( 'vida/proposta/situacoes' );
  }

  public findSituacaoApolice(): Observable<any[]> {
    return this.servico.get( 'vida/emissao/apolices/situacoes' );
  }

  public listar( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/proposta/propostas', filtro );
  }

  public listarEmCriticas( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/proposta/propostas/criticas', filtro );
  }

  public listarHistoricoSeguro( numeroProposta: any, versaoProposta: any ): Observable<any[]> {
    return this.servico.get( `vida/proposta/propostas/${numeroProposta}/versoes/${versaoProposta}/historicos-seguro`);
  }

  public listarHistoricoSegurado( numeroProposta: any, versaoProposta: any, cpfCnpj: any ): Observable<any[]> {
    return this.servico.get( `vida/proposta/propostas/${numeroProposta}/versoes/${versaoProposta}/historicos-segurado/${cpfCnpj}`);
  }

  public get( numeroPropostaExterna ): Observable<any[]> {
    return this.servico.get( `vida/proposta/propostas/${numeroPropostaExterna}` );
  }

  public getContasDevolucao( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/financeiro/conta-bancaria', filtro);
  }

  public declinar( numeroProposta: any, versaoProposta: any, proposta: any, contaDevolucao: any ): Observable<any[]> {
    const qs: String = this.servico.toQueryString(proposta);
    return this.servico.put( `vida/proposta/propostas/${numeroProposta}/versoes/${versaoProposta}/declinar?${qs}`, contaDevolucao );
  }

}
