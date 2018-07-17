import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoVendedorService {

    constructor(private servico: HttpService) { }

    public list(filtro: any): Observable<any[]> {
      return this.servico.get('corporativo/estrutura-comercial/tipos-vendedor', filtro);
    }

    public get(tipoVendedor: any): Observable<any[]> {
      return this.servico.get(`corporativo/estrutura-comercial/tipos-vendedor/${tipoVendedor.codigo}`
      + `/${tipoVendedor.dataInicioVigencia}/${tipoVendedor.dataHoraCadastro}`);
    }

    public add(tipoVendedor: any, aprove = false): Observable<any[]> {
      return this.servico.post('corporativo/estrutura-comercial/tipos-vendedor?acao=' + (aprove ? 'A' : 'S'), tipoVendedor);
    }

    public update(tipoVendedor: any, aprove = false): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-vendedor/${tipoVendedor.codigo}`
      + `/${tipoVendedor.dataInicioVigencia}/${tipoVendedor.dataHoraCadastro}`
      + `?acao=` + (aprove ? 'A' : 'S'), tipoVendedor);
    }

    public aprove(tipoVendedor: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-vendedor/${tipoVendedor.codigo}`
      + `/${tipoVendedor.dataInicioVigencia}/${tipoVendedor.dataHoraCadastro}`
      + `?acao=A`, tipoVendedor);
    }

    public close(tipoVendedor: any): Observable<any[]> {
      return this.servico.put(`corporativo/estrutura-comercial/tipos-vendedor/${tipoVendedor.codigo}`
      + `/${tipoVendedor.dataInicioVigencia}/${tipoVendedor.dataHoraCadastro}`, tipoVendedor);
    }

    public delete(tipoVendedor: any): Observable<any[]> {
      return this.servico.delete(`corporativo/estrutura-comercial/tipos-vendedor/${tipoVendedor.codigo}`
      + `/${tipoVendedor.dataInicioVigencia}/${tipoVendedor.dataHoraCadastro}`);
    }

}
