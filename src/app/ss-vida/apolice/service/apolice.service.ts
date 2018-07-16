import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../shared/services/http.service';
import { UtilService } from '../../shared/services/util.service';

@Injectable()
export class ApoliceService {

  constructor(
    private servico: HttpService,
    public utilService: UtilService
  ) { }

  public findSituacaoApolice(): Observable<any[]> {
    return this.servico.get( 'vida/emissao/apolices/situacoes' );
  }

  public listar( filtro: any ): Observable<any[]> {
    return this.servico.get( 'vida/proposta/propostas', filtro );
  }

  public get( numeroApolice: number ): Observable<any> {
    return this.servico.get( 'vida/emissao/apolices/' + numeroApolice );
  }

  public getProposta( numeroProposta: number ): Observable<any> {
    return this.servico.get( 'vida/proposta/propostas/' + numeroProposta );
  }

  public getCobrancas( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/cobranca-devolucao/cobrancas`);
  }

  public getDadosParcelaCobranca( numeroApolice: number, endosso: number, parcela: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/cobranca-devolucao/cobrancas/`
    + `${endosso}/parcelas/${parcela}/detalhamento`);
  }

  public getDetalhamentoCobranca( numeroApolice: number, endosso: number, parcela: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/cobranca-devolucao/cobrancas/${endosso}/parcelas/${parcela}`);
  }

  public getDevolucoes( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/cobranca-devolucao/devolucao`);
  }

  public getDetalhamentoDevolucao( numeroApolice: number, endosso: number, parcela: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/cobranca-devolucao/cobrancas/${endosso}/parcelas/${parcela}`);
  }

  public getComissaoCadeiaComissionado( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/comissao/cadeia-comissionado` );
  }

  public getComissaoCalculada( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/comissao/comissoes-calculadas` );
  }

  public findEndossos( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/endossos` );
  }

  public createEndosso( numeroApolice: number ): Observable<any> {
    return this.servico.post( `vida/emissao/apolices/${numeroApolice}/endossos` );
  }

  public deleteEndosso( numeroApolice: number ): Observable<any> {
    return this.servico.delete( `vida/emissao/apolices/${numeroApolice}/endossos` );
  }

  public getPropostaEndosso( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/endossos/proposta` );
  }

  public findMotivosEndossos( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/motivos-endosso`, { 'numero': numeroApolice } );
  }

  public removeMotivoEndosso( numeroApolice: number, numeroMotivo: any ) {
    return this.servico.delete( `vida/emissao/apolices/${numeroApolice}/endossos/motivo/${numeroMotivo}` );
  }

  public getDadosPessoais( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/endossos/dados-pessoais` );
  }

  public getBeneficiarios( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/endossos/beneficiarios` );
  }

  public salvarBeneficiarios( numeroApolice: number, beneficiarios: any ): Observable<any> {
    return this.servico.put( `vida/emissao/apolices/${numeroApolice}/endossos/beneficiarios`, beneficiarios );
  }

  public salvarDadosPessoais( numeroApolice: number, pessoaWrapper: any ): Observable<any> {
    return this.servico.put( `vida/emissao/apolices/${numeroApolice}/endossos/dados-pessoais`, pessoaWrapper );
  }

  public salvarContato( numeroApolice: number, contatoWrapper: any ): Observable<any> {
    return this.servico.put( `vida/emissao/apolices/${numeroApolice}/endossos/contato`, contatoWrapper );
  }

  public setAreaSolicitante(  numeroApolice: number,
                              areaSolicitante: string,
                              numeroPropostaEndosso: number,
                              sequencialProposta: number ): Observable<any> {
    const obj = {
      'areaSolicitante': areaSolicitante,
      'numeroProposta': numeroPropostaEndosso,
      'sequencialProposta': sequencialProposta
    };
    return this.servico.post( `vida/emissao/apolices/${numeroApolice}/endossos/set-area-solicitante`, obj );
  }

  public getContato( numeroApolice: number ): Observable<any> {
    return this.servico.get( `vida/emissao/apolices/${numeroApolice}/endossos/contato` );
  }

}
