import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParceiroService {

    constructor(private servico: HttpService) { }

    public list(filtro: any): Observable<any[]> {
      return this.servico.get('corporativo/estrutura-comercial/parceiros', filtro);
    }

    public get(parceiro: any): Observable<any[]> {
      return this.servico.get(`corporativo/estrutura-comercial/parceiros/${parceiro.codigo}`
      + `/vigencia/${parceiro.dataInicioVigencia}/atualizacao/${parceiro.dataHoraCadastramento}`);
    }

    public add(parceiro: any, aprove = false): Observable<any[]> {
      return this.servico.post('corporativo/estrutura-comercial/parceiros?acao=' + (aprove ? 'A' : 'S'), parceiro);
    }

    public update(parceiro: any, aprove = false): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/parceiros/${parceiro.codigo}`
      + `/vigencia/${parceiro.dataInicioVigencia}/atualizacao/${parceiro.dataHoraCadastramento}`
      + `?acao=` + (aprove ? 'A' : 'S'), parceiro);
    }

    public aprove(parceiro: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/parceiros/${parceiro.codigo}`
      + `/vigencia/${parceiro.dataInicioVigencia}/atualizacao/${parceiro.dataHoraCadastramento}`
      + `?acao=A`, parceiro);
    }

    public close(parceiro: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/parceiros/${parceiro.codigo}`
      + `/vigencia/${parceiro.dataInicioVigencia}/atualizacao/${parceiro.dataHoraCadastramento}`, parceiro);
    }

    public delete(parceiro: any): Observable<any[]> {
      return this.servico.delete(`corporativo/estrutura-comercial/parceiros/${parceiro.codigo}`
      + `?dataInicioVigencia=${parceiro.dataInicioVigencia}&dataHoraCadastramento=${parceiro.dataHoraCadastramento}`);
    }

}
