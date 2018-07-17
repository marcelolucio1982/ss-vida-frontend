import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoRelacionamentoService {

    constructor(private servico: HttpService) { }

    public list(filtro: any): Observable<any[]> {
      return this.servico.get('corporativo/estrutura-comercial/tipos-relacionamento', filtro);
    }

    public get(tipoRelacionamento: any): Observable<any[]> {
      return this.servico.get(`corporativo/estrutura-comercial/tipos-relacionamento/${tipoRelacionamento.codigo}`
      + `/${tipoRelacionamento.dataInicioVigencia}/${tipoRelacionamento.dataHoraAtualizacao}`);
    }

    public add(tipoRelacionamento: any, aprove = false): Observable<any[]> {
      return this.servico.post('corporativo/estrutura-comercial/tipos-relacionamento?acao=' + (aprove ? 'A' : 'S'), tipoRelacionamento);
    }

    public update(tipoRelacionamento: any, aprove = false): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-relacionamento/${tipoRelacionamento.codigo}`
      + `/${tipoRelacionamento.dataInicioVigencia}/${tipoRelacionamento.dataHoraAtualizacao}`
      + `?acao=` + (aprove ? 'A' : 'S'), tipoRelacionamento);
    }

    public aprove(tipoRelacionamento: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-relacionamento/${tipoRelacionamento.codigo}`
      + `/${tipoRelacionamento.dataInicioVigencia}/${tipoRelacionamento.dataHoraAtualizacao}`
      + `?acao=A`, tipoRelacionamento);
    }

    public close(tipoRelacionamento: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-relacionamento/${tipoRelacionamento.codigo}`
      + `/${tipoRelacionamento.dataInicioVigencia}/${tipoRelacionamento.dataHoraAtualizacao}`, tipoRelacionamento);
    }

    public delete(tipoRelacionamento: any): Observable<any[]> {
      return this.servico.delete(`corporativo/estrutura-comercial/tipos-relacionamento/${tipoRelacionamento.codigo}`
      + `/${tipoRelacionamento.dataInicioVigencia}/${tipoRelacionamento.dataHoraAtualizacao}`);
    }

}
