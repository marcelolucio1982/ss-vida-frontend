import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AssistenciaService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('vida/assistencias', filtro);
  }

  public get(assistencia: any): Observable<any[]> {
    return this.servico.get(`vida/assistencias/${assistencia.codigo}/versoes/${assistencia.versao}`);
  }

  public add(assistencia: any, aprove = false): Observable<any[]> {
    return this.servico.post('vida/assistencias?acao=' + (aprove ? 'A' : 'S'), assistencia);
  }

  public update(assistencia: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
      assistencia.dataAtualizacao = '';
    }
    return this.servico.put(`vida/assistencias/${assistencia.codigo}?acao=` + (aprove ? 'A' : 'S'), assistencia);
  }

  public aprove(assistencia: any): Observable<any[]> {
    return this.servico.put(`vida/assistencias/${assistencia.codigo}?acao=A`, assistencia);
  }

  public close(assistencia: any): Observable<any[]> {
    return this.servico.put(`vida/assistencias/${assistencia.codigo}/versoes/${assistencia.versao}/encerrar`, assistencia);
  }

  public delete(assistencia: any): Observable<any[]> {
    return this.servico.delete(`vida/assistencias/${assistencia.codigo}`
    + `/versoes/${assistencia.versao}/atualizacao/${assistencia.dataAtualizacao}`);
  }

}
