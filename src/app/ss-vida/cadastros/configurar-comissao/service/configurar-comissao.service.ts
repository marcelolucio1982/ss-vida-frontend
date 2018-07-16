import { Injectable } from '@angular/core';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigurarComissaoService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('vida/importacaos', filtro);
  }

  public get(importacao: any): Observable<any[]> {
    return this.servico.get(`vida/importacaos/${importacao.sigla}/versoes/${importacao.versao}`);
  }

  public persist(importacao: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
      importacao.dataAtualizacao = '';
    }
    return this.servico.post('vida/importacaos?acao=' + (aprove ? 'A' : 'S'), importacao);
  }

  public delete(importacao: any): Observable<any[]> {
    return this.servico.delete(`vida/importacaos/${importacao.sigla}`
      + `/versoes/${importacao.versao}/atualizacao/${importacao.dataAtualizacao}`);
  }

  public encerrar(importacao: any): Observable<any[]> {
    return this.servico.post(`vida/importacaos/${importacao.sigla}/versoes/${importacao.versao}/encerrar`, importacao);
  }

}
