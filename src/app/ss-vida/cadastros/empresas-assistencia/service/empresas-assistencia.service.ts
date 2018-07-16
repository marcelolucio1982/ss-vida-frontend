import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EmpresasAssistenciaService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('vida/empresas-assistencias', filtro);
  }

  public get(empresaAssistencia: any): Observable<any[]> {
    return this.servico.get(`vida/empresas-assistencias/${empresaAssistencia.codigo}/versoes/${empresaAssistencia.versao}`);
  }

  public add(empresaAssistencia: any, aprove = false): Observable<any[]> {
    return this.servico.post('vida/empresas-assistencias?acao=' + (aprove ? 'A' : 'S'), empresaAssistencia);
  }

  public update(empresaAssistencia: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
      empresaAssistencia.dataAtualizacao = '';
    }
    return this.servico.put(`vida/empresas-assistencias/${empresaAssistencia.codigo}?acao=` + (aprove ? 'A' : 'S'), empresaAssistencia);
  }

  public aprove(empresaAssistencia: any): Observable<any[]> {
    return this.servico.put(`vida/empresas-assistencias/${empresaAssistencia.codigo}?acao=A`, empresaAssistencia);
  }

  public close(empresaAssistencia: any): Observable<any[]> {
    return this.servico.put(`vida/empresas-assistencias/${empresaAssistencia.codigo}`
    + `/versoes/${empresaAssistencia.versao}/encerrar`, empresaAssistencia);
  }

  public delete(empresaAssistencia: any): Observable<any[]> {
    return this.servico.delete(`vida/empresas-assistencias/${empresaAssistencia.codigo}`
    + `/versoes/${empresaAssistencia.versao}/atualizacao/${empresaAssistencia.dataAtualizacao}`);
  }


}
