import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgrupadorLocalVendaService {

  constructor( private servico: HttpService ) { }

  public list( filtro: any ): Observable<any[]> {
    return this.servico.get( 'corporativo/estrutura-comercial/agrupadores/locais-venda', filtro );
  }

  public get( agrupadorLocalVenda: any ): Observable<any[]> {
    return this.servico.get( `corporativo/estrutura-comercial/agrupadores/locais-venda/`
    + `${agrupadorLocalVenda.codigo}/${agrupadorLocalVenda.dataInicioVigencia}/${agrupadorLocalVenda.dataHoraCadastramento}` );
  }

  public criar( agrupadorLocalVenda: any ): Observable<any[]> {
    return this.servico.post( 'corporativo/estrutura-comercial/agrupadores/locais-venda?acao=S', agrupadorLocalVenda );
  }

  public salvar( agrupadorLocalVenda: any ): Observable<any[]> {
    return this.servico.put( `corporativo/estrutura-comercial/agrupadores/locais-venda/`
    + `${agrupadorLocalVenda.codigo}/${agrupadorLocalVenda.dataInicioVigencia}/${agrupadorLocalVenda.dataHoraCadastramento}`
    + `?acao=S`, agrupadorLocalVenda );
  }

  public aprovar( agrupadorLocalVenda: any ): Observable<any[]> {
    return this.servico.put( `corporativo/estrutura-comercial/agrupadores/locais-venda/`
    + `${agrupadorLocalVenda.codigo}/${agrupadorLocalVenda.dataInicioVigencia}/${agrupadorLocalVenda.dataHoraCadastramento}`
    + `?acao=A`, agrupadorLocalVenda );
  }

  public excluir( agrupadorLocalVenda: any ): Observable<any[]> {
    return this.servico.delete( `corporativo/estrutura-comercial/agrupadores/locais-venda/`
    + `${agrupadorLocalVenda.codigo}/${agrupadorLocalVenda.dataInicioVigencia}/${agrupadorLocalVenda.dataHoraCadastramento}` );
  }

}
