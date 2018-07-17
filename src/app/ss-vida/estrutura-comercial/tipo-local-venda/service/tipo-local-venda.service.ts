import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoLocalVendaService {

    constructor(private servico: HttpService) { }

    public list(filtro: any): Observable<any[]> {
      return this.servico.get('corporativo/estrutura-comercial/tipos-local-venda', filtro);
    }

    public get(tipoLocalVenda: any): Observable<any[]> {
      return this.servico.get(`corporativo/estrutura-comercial/tipos-local-venda/${tipoLocalVenda.codigo}`
      + `/${tipoLocalVenda.dataInicioVigencia}/${tipoLocalVenda.dataHoraAtualizacao}`);
    }

    public add(tipoLocalVenda: any, aprove = false): Observable<any[]> {
      return this.servico.post('corporativo/estrutura-comercial/tipos-local-venda?acao=' + (aprove ? 'A' : 'S'), tipoLocalVenda);
    }

    public update(tipoLocalVenda: any, aprove = false): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-local-venda/${tipoLocalVenda.codigo}`
      + `/${tipoLocalVenda.dataInicioVigencia}/${tipoLocalVenda.dataHoraAtualizacao}`
      + `?acao=` + (aprove ? 'A' : 'S'), tipoLocalVenda);
    }

    public aprove(tipoLocalVenda: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-local-venda/${tipoLocalVenda.codigo}`
      + `/${tipoLocalVenda.dataInicioVigencia}/${tipoLocalVenda.dataHoraAtualizacao}`
      + `?acao=A`, tipoLocalVenda);
    }

    public close(tipoLocalVenda: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-local-venda/${tipoLocalVenda.codigo}`
      + `/${tipoLocalVenda.dataInicioVigencia}/${tipoLocalVenda.dataHoraAtualizacao}`, tipoLocalVenda);
    }

    public delete(tipoLocalVenda: any): Observable<any[]> {
      return this.servico.delete(`corporativo/estrutura-comercial/tipos-local-venda/${tipoLocalVenda.codigo}`
      + `/${tipoLocalVenda.dataInicioVigencia}/${tipoLocalVenda.dataHoraAtualizacao}`);
    }

}
