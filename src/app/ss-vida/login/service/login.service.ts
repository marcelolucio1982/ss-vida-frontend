import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../shared/services/http.service';
import { LoaderService } from '../../shared/services/loader.service';
import { MensagemService } from '../../shared/services/mensagem.service';
import { Usuario } from './../dominio/usuario';
import { UtilService } from '../../shared/services/util.service';

@Injectable()
export class LoginService {

  private usuarioAutenticado: Boolean = false;
  exibirMenuEmitter = new EventEmitter<boolean>();
  private usuario: Usuario = null;

  constructor (
    private router: Router,
    private http: Http,
    private loaderService: LoaderService,
    private httpService: HttpService,
    private mensagemService: MensagemService,
    private utilService: UtilService
  ) { }

  public fazerLogin(usuario: any): Observable<any> {
    this.loaderService.display( true );
    return this.http.post( this.httpService.backendPrefix + 'seguranca/login', usuario )
      .map( this.loginHandleSuccess ).catch( this.loginHandleError );
  }

  public getPermissoes( contexto: string = '' ): Observable<any[]> {
    return this.httpService.get( 'seguranca/permissoes', contexto );
  }

  public loginHandleSuccess = ( response: Response ) => {
    this.loaderService.display( false );
    this.usuarioAutenticado = true;
    return response.json() || [];
  }

  public loginHandleError = ( error: Response ) => {
    this.loaderService.display( false );
    this.usuarioAutenticado = false;
    this.exibirMenuEmitter.emit( false );
    if ( error.status === 401 ) {
      this.mensagemService.enviarErro( error.json()[0].msg );
    } else {
      const prefixo = error.status !== 500 ? '' : '[ERRO INESPERADO] ';
      const retorno = error.json();
      for (const elemento of retorno) {
        this.mensagemService.enviarErro( prefixo + elemento.message );
      }
    }
    return Observable.throw( error );
  }

  public isUsuarioAutenticado() {
    return this.usuarioAutenticado;
  }

  public mostrarMenu() {
    this.exibirMenuEmitter.emit( true );
  }

  public logout() {
    this.usuario = null;
    this.usuarioAutenticado = false;
    this.exibirMenuEmitter.emit( false );
  }

  public setUsuario( newUsuario: Usuario ) {
    this.usuario = newUsuario;
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }
}
