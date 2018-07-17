import { Injectable } from '@angular/core';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoberturaService {

  constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('vida/coberturas', filtro);
  }

  public getVersoes(cobertura: any): Observable<any[]> {
    return this.servico.get(`vida/coberturas/${cobertura.codigo}/versoes`);
  }

  public get(cobertura: any): Observable<any[]> {
    return this.servico.get(`vida/coberturas/${cobertura.codigo}/versoes/${cobertura.versao}`);
  }

  public add(cobertura: any, aprove = false): Observable<any[]> {
    return this.servico.post('vida/coberturas?acao=' + (aprove ? 'A' : 'S'), cobertura);
  }

  public update(cobertura: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    return this.servico.put(`vida/coberturas/${cobertura.codigo}?acao=` + (ehNovaVersao ? 'N' : (aprove ? 'A' : 'S')), cobertura);
  }

  public aprove(cobertura: any): Observable<any[]> {
    return this.servico.put(`vida/coberturas/${cobertura.codigo}?acao=A`, cobertura);
  }

  public delete(cobertura: any): Observable<any[]> {
    return this.servico.delete(`vida/coberturas/${cobertura.codigo}/versoes/${cobertura.versao}`);
  }

}
