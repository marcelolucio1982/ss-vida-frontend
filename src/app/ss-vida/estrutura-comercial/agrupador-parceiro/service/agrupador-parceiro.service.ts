import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AgrupadorParceiroService {

  constructor( private servico: HttpService ) { }

  public list( filtro: any ): Observable<any[]> {
    return this.servico.get( 'corporativo/estrutura-comercial/agrupadores/parceiros', filtro );
  }

  public get( agrupadorParceiro: any ): Observable<any[]> {
    return this.servico.get( `corporativo/estrutura-comercial/agrupadores/parceiros/`
    + `${agrupadorParceiro.codigo}/${agrupadorParceiro.dataInicioVigencia}/${agrupadorParceiro.dataHoraAtualizacao}` );
  }

  public criar( agrupadorParceiro: any ): Observable<any[]> {
    return this.servico.post( 'corporativo/estrutura-comercial/agrupadores/parceiros?acao=S', agrupadorParceiro );
  }

  public salvar( agrupadorParceiro: any ): Observable<any[]> {
    return this.servico.put( `corporativo/estrutura-comercial/agrupadores/parceiros/`
    + `${agrupadorParceiro.codigo}/${agrupadorParceiro.dataInicioVigencia}/${agrupadorParceiro.dataHoraAtualizacao}`
    + `?acao=S`, agrupadorParceiro );
  }

  public aprovar( agrupadorParceiro: any ): Observable<any[]> {
    return this.servico.put( `corporativo/estrutura-comercial/agrupadores/parceiros/`
    + `${agrupadorParceiro.codigo}/${agrupadorParceiro.dataInicioVigencia}/${agrupadorParceiro.dataHoraAtualizacao}`
    + `?acao=A`, agrupadorParceiro );
  }

  public excluir( agrupadorParceiro: any ): Observable<any[]> {
    return this.servico.delete( `corporativo/estrutura-comercial/agrupadores/parceiros/`
    + `${agrupadorParceiro.codigo}/${agrupadorParceiro.dataInicioVigencia}/${agrupadorParceiro.dataHoraAtualizacao}` );
  }

}
