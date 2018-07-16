import { Injectable } from '@angular/core';
import { HttpService } from './../../../shared/services/http.service';
import { UtilService } from './../../../shared/services/util.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CadastroProdutoService {

  constructor(private servico: HttpService, private utilService: UtilService) { }

  public list(filtro: any, pesquisaPorParteCodigo = false): Observable<any[]> {
    if (filtro.codigoProduto && !pesquisaPorParteCodigo) {
      filtro.codigoProduto = this.utilService.pad(filtro.codigoProduto, 4);
    }
    return this.servico.get('vida/produtos', filtro);
  }

  public listVersoes(produto: any): Observable<any[]> {
    return this.servico.get(`vida/produtos/${produto.codigo}/versoes`);
  }

  public get(produto: any): Observable<any[]> {
    return this.servico.get(`vida/produtos/${produto.codigo}`);
  }

  public persist(produto: any, aprove = false): Observable<any[]> {
    produto.acao = aprove ? 'A' : 'S';
    return this.servico.post('vida/produtos', produto);
  }

  public delete(produto: any): Observable<any[]> {
    return this.servico.delete(`vida/produtos/${produto.codigo}`);
  }

  public history(produto: any): Observable<any[]> {
    return this.servico.get(`vida/produtos/${produto.codigo}/versoes/${produto.versaoProduto}/historico`, { 'modulo': 'RRDMPROD' });
  }

}
