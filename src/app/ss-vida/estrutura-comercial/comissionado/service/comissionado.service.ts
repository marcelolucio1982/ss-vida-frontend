import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UtilService } from './../../../shared/services/util.service';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';

@Injectable()
export class ComissionadoService {

  constructor(
    private servico: HttpService,
    public utilService: UtilService
  ) { }

  public listTipoComissionado(): Observable<any[]> {
    return this.servico.get( 'corporativo/estrutura-comercial/tipos-comissionado' );
  }

  public list( filtro: any ): Observable<any[]> {
    return this.servico.get( 'corporativo/estrutura-comercial/comissionados', filtro );
  }

  public get( codigo: any, dataAtualizacao: any ): Observable<any> {
    return this.servico.get( `corporativo/estrutura-comercial/comissionados/`
    + `${ codigo }/atualizacao/${dataAtualizacao}`
   );
  }

  public excluir( comissionado: any ): Observable<any[]> {
    return this.servico.delete( `corporativo/estrutura-comercial/comissionados/` +
    `${ comissionado.codigo }/atualizacao/${comissionado.dataAtualizacao}` +
    `?dataInicioVigencia=${ comissionado.dataInicioVigencia }` );
  }

  public atualizar( aprovar: boolean, comissionado: any ): Observable<any> {
    const chAprovar = aprovar ? 'A' : 'S';
    return this.servico.put( `corporativo/estrutura-comercial/comissionados/` +
    `${ comissionado.codigo }/atualizacao/${comissionado.dataAtualizacao}` +
    `?acao=` + chAprovar, comissionado );
  }

  public criar( aprovar: boolean, comissionado: any ): Observable<any> {
    const chAprovar = aprovar ? 'A' : 'S';
    return this.servico.post( `corporativo/estrutura-comercial/comissionados?acao=` + chAprovar, comissionado );
  }

}
