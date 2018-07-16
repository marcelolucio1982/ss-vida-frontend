import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { trigger, animate, transition, style, query } from '@angular/animations';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import { LoginService } from './../../login/service/login.service';
import { ComissionadoService } from './service/comissionado.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-comissionado',
  templateUrl: './comissionado.component.html',
  styleUrls: ['./comissionado.component.css']
})

export class ComissionadoComponent implements OnInit {

  public formulario: FormGroup;

  public retorno: any = false;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    private comissionadoService: ComissionadoService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      opcoesComissionado: [null, Validators.required],
      cnpjRazaoSocial: [null, Validators.required]
    } );
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.onSubmit();
    }
  }

  onSubmit() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    const cnpjRazaoSocial = filtro.cnpjRazaoSocial.toString().replace(/[^a-zA-Z0-9]/g, '');
    if ( cnpjRazaoSocial ) {
      this.comissionadoService.list( {
        'cpfCnpj': filtro.opcoesComissionado.codigo === 1 ? cnpjRazaoSocial : null,
        'nomeRazaoSocial': filtro.opcoesComissionado.codigo === 2 ? cnpjRazaoSocial : null  } ).subscribe(
        res => {
          this.retorno = res;
          if  ( !this.retorno || this.retorno.length === 0 ) {
            this.mensagemService.enviarErro( 'Não existe registros conforme informação inserida(s) no(s) campo(s).' );
            this.retorno = false;
          } else {
            this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
          }
        }
      );
    } else {
      this.mensagemService.enviarErro( 'Ao menos um dos campos da interface de pesquisa deve ser preenchido.' );
    }
  }

  visualisar( e: any ) {
    this.router.navigate( [ '/comissionado',
                            e.codigo,
                            e.dataAtualizacao,
                            'visualizar' ] );
  }

  excluir( e: any ) {
    this.mensagemService.enviarMsgConfirm( 'Deseja realmente excluir esse registro?' ).subscribe( result => {
      if ( result ) {
        this.comissionadoService.excluir( e ).subscribe( res => {
          this.onSubmit();
          this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
        } );
      }
    } );
  }

  gerarNovaVersao( e: any ) {
    this.router.navigate( ['/comissionado', e.codigo, 'versoes', e.versao, 'novo'] );
  }

  editar( e: any ) {
    this.router.navigate( [ '/comissionado',
                            e.codigo,
                            'atualizacao',
                            e.dataAtualizacao, ] );
  }

  encerrar( e: any ) {

  }

}
