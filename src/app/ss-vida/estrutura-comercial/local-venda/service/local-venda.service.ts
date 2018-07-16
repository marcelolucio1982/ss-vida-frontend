import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { UtilService } from './../../../shared/services/util.service';

@Injectable()
export class LocalVendaService {

  constructor(
    private servico: HttpService,
    public utilService: UtilService
  ) { }

  public list( filtro: any ): Observable<any[]> {
    return this.servico.get( 'corporativo/estrutura-comercial/locais-venda', filtro );
  }

  public get( codigo: any, dataHoraCadastramento: any ): Observable<any[]> {
    return this.servico.get( `corporativo/estrutura-comercial/locais-venda/`
    + `${ codigo }`, { 'dataHoraCadastramento':  dataHoraCadastramento } );
  }

  public findParceirosPorCodigoExterno( codigoExterno: any, dataInicioVigencia: any, codigoParceiro: any ): Observable<any[]> {
    return this.servico.get( `corporativo/estrutura-comercial/locais-venda`,
     {
       'codigoExterno':  codigoExterno,
       'dataInicioVigencia': dataInicioVigencia,
       'codigoParceiro': codigoParceiro
    } );
  }

  public salvar( localVenda: any ): Observable<any[]> {
    return this.servico.post( `corporativo/estrutura-comercial/locais-venda?acao=S`, localVenda );
  }

  public aprovar( localVenda: any ): Observable<any[]> {
    return this.servico.post( `corporativo/estrutura-comercial/locais-venda?acao=A`, localVenda );
  }

  public excluir( localVenda: any ): Observable<any[]> {
    return this.servico.delete( `corporativo/estrutura-comercial/locais-venda` +
      `?seqLocalVenda=${ localVenda.seqLocalVenda }` +
      `&dataInicioVigencia=${ localVenda.dataInicioVigencia }` +
      `&dataHoraCadastramento=${ localVenda.dataHoraCadastramento }` );
  }

}
