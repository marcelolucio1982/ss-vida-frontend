import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { UtilService } from '../../shared/services/util.service';

@Injectable()
export class EndossoService {

  constructor(
    private servico: HttpService,
    public utilService: UtilService
  ) { }

  public findSituacoesEndosso(): Observable<any[]> {
    return this.servico.get( 'vida/endosso/situacoes' );
  }

  public findSituacaoApolice(): Observable<any[]> {
    return this.servico.get( 'vida/emissao/apolices/situacoes' );
  }

  public listar( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/endosso/endossos', filtro );
  }

  public listarEmCriticas( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/endosso/endossos/criticas', filtro );
  }

  public listarHistoricoSeguro( numeroEndosso: any, versaoEndosso: any ): Observable<any[]> {
    return this.servico.get( `vida/endosso/endossos/${numeroEndosso}/versoes/${versaoEndosso}/historicos-seguro`);
  }

  public get( numeroEndossoExterna ): Observable<any[]> {
    return this.servico.get( `vida/endosso/endossos/${numeroEndossoExterna}` );
  }

  public getContasDevolucao( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/financeiro/conta-bancaria', filtro);
  }

  public declinar( numeroEndosso: any, versaoEndosso: any, endosso: any, contaDevolucao: any ): Observable<any[]> {
    const qs: String = this.servico.toQueryString(endosso);
    return this.servico.put( `vida/endosso/endossos/${numeroEndosso}/versoes/${versaoEndosso}/declinar?${qs}`, contaDevolucao );
  }

}
