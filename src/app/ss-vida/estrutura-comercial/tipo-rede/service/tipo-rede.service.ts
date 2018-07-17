import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoRedeService {

    constructor(private servico: HttpService) { }

    public list(filtro: any): Observable<any[]> {
      return this.servico.get('corporativo/estrutura-comercial/tipos-rede', filtro);
    }

    public get(tipoRede: any): Observable<any[]> {
      return this.servico.get(`corporativo/estrutura-comercial/tipos-rede/${tipoRede.codigo}`
      + `/${tipoRede.dataInicioVigencia}/${tipoRede.dataHoraAtualizacao}`);
    }

    public add(tipoRede: any, aprove = false): Observable<any[]> {
      return this.servico.post('corporativo/estrutura-comercial/tipos-rede?acao=' + (aprove ? 'A' : 'S'), tipoRede);
    }

    public update(tipoRede: any, aprove = false): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-rede/${tipoRede.codigo}`
      + `/${tipoRede.dataInicioVigencia}/${tipoRede.dataHoraAtualizacao}`
      + `?acao=` + (aprove ? 'A' : 'S'), tipoRede);
    }

    public aprove(tipoRede: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-rede/${tipoRede.codigo}`
      + `/${tipoRede.dataInicioVigencia}/${tipoRede.dataHoraAtualizacao}`
      + `?acao=A`, tipoRede);
    }

    public close(tipoRede: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-rede/${tipoRede.codigo}`
      + `/${tipoRede.dataInicioVigencia}/${tipoRede.dataHoraAtualizacao}`, tipoRede);
    }

    public delete(tipoRede: any): Observable<any[]> {
      return this.servico.delete(`corporativo/estrutura-comercial/tipos-rede/${tipoRede.codigo}`
      + `/${tipoRede.dataInicioVigencia}/${tipoRede.dataHoraAtualizacao}`);
    }

}
