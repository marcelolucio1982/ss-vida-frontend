import { Injectable } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { HttpService } from './../../../shared/services/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class VendedorService {

constructor(private servico: HttpService) { }

  public list(filtro: any): Observable<any[]> {
    return this.servico.get('corporativo/estrutura-comercial/vendedores', filtro);
  }

  public get(codigo: number, dthCadastramento: any): Observable<any[]> {
    // corporativo/estrutura-comercial/vendedores/90027954?dataHoraCadastramento=2016-06-30-14.22.46.545485
    return this.servico.get(`corporativo/estrutura-comercial/vendedores/${codigo}`, dthCadastramento);
  }

  public add(vendedor: any, aprove = false): Observable<any[]> {
    // corporativo/estrutura-comercial/vendedores?acao=S
    return this.servico.post('corporativo/estrutura-comercial/vendedores?acao=' + (aprove ? 'A' : 'S'), vendedor);
  }

  public update(vendedor: any, aprove = false, ehNovaVersao = false): Observable<any[]> {
    if (ehNovaVersao) {
        vendedor.dataHoraCadastramento = '';
    }
    return this.servico.post('corporativo/estrutura-comercial/vendedores?acao=' + (aprove ? 'A' : 'S'), vendedor);
  }

  public aprove(vendedor: any): Observable<any[]> {
    return this.servico.put(`corporativo/estrutura-comercial/vendedores/${vendedor.codigo}?acao=A`, vendedor);
  }

  public close(vendedor: any): Observable<any[]> {
    return this.servico.put(`corporativo/estrutura-comercial/vendedores/${vendedor.codigo}/encerrar`, vendedor);
  }

  public delete(vendedor: any): Observable<any[]> {
    return this.servico.delete(`corporativo/estrutura-comercial/vendedores/?seqVendedor=${vendedor.seqVendedor}`
    + `&dataInicioVigencia=${vendedor.dataInicioVigencia}&dataHoraCadastramento=${vendedor.dataHoraCadastramento}`);
  }

}
