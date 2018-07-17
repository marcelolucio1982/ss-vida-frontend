import { Injectable } from '@angular/core';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarregamentoService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('vida/carregamentos', filtro);
  }

  public get(carregamento: any): Observable<any[]> {
    return this.servico.get(`vida/carregamentos/${carregamento.sigla}/versoes/${carregamento.versao}`);
  }

  public persist(carregamento: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
      carregamento.dataAtualizacao = '';
    }
    return this.servico.post('vida/carregamentos?acao=' + (aprove ? 'A' : 'S'), carregamento);
  }

  public delete(carregamento: any): Observable<any[]> {
    return this.servico.delete(`vida/carregamentos/${carregamento.sigla}`
      + `/versoes/${carregamento.versao}/atualizacao/${carregamento.dataAtualizacao}`);
  }

  public encerrar(carregamento: any): Observable<any[]> {
    return this.servico.post(`vida/carregamentos/${carregamento.sigla}/versoes/${carregamento.versao}/encerrar`, carregamento);
  }

}
