import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { MensagemService } from './mensagem.service';
import { LoaderService } from './loader.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private loaderService: LoaderService,
    private mensagemService: MensagemService
    ) { }

  public backendPrefix: String = environment.backend;

  public get(url: string, objeto: any = {}): Observable<any[]> {
    this.loaderService.display(true);
    const qs: String = this.toQueryString(objeto);
    return this.http.get(this.backendPrefix + url + '?' + qs)
      .map(this.handleSuccess).catch(this.handleError);
  }

  public post(url: string, objeto: any = {}): Observable<any[]> {
    this.loaderService.display(true);
    return this.http.post(this.backendPrefix + url, objeto)
    .map(this.handleSuccess).catch(this.handleError);
  }

  public put(url: string, objeto: any = {}): Observable<any[]> {
    this.loaderService.display(true);
    return this.http.put(this.backendPrefix + url, objeto)
    .map(this.handleSuccess).catch(this.handleError);
  }

  public patch(url: string, objeto: any = {}): Observable<any[]> {
    this.loaderService.display(true);
    return this.http.patch(this.backendPrefix + url, objeto)
    .map(this.handleSuccess).catch(this.handleError);
  }

  public delete(url: string): Observable<any[]> {
    this.loaderService.display(true);
    return this.http.delete(this.backendPrefix + url)
    .map(this.handleSuccess).catch(this.handleError);
  }

  public handleSuccess = (response: Response) => {
    this.loaderService.display( false );
    return response.json() || [];
  }

  public handleError = (error: Response) => {
    const prefixo = error.status !== 500 ? '' : '[ERRO INESPERADO] ';

    this.loaderService.display( false );
    const retorno = error.json();
    for (const elemento of retorno) {
      this.mensagemService.enviarErro(prefixo + elemento.message);
    }

    return Observable.throw(error);
  }

  // Fonte: https://stackoverflow.com/questions/5505085/flatten-a-javascript-object-to-pass-as-querystring
  public toQueryString(obj: Object) {
    return Object
      .keys(obj)
      .filter(key => !(typeof obj[key] === 'undefined' || obj[key] === null || obj[key] === ''))
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(typeof obj[key] === 'string' ? obj[key].trim() : obj[key])}`)
      .join('&');
  }
}
