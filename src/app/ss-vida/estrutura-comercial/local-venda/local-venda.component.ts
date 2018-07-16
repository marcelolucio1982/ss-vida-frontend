import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';
import { LocalVendaService } from './service/local-venda.service';
import { ParceiroService } from './../parceiro/service/parceiro.service';
import { TipoLocalVendaService } from '../tipo-local-venda/service/tipo-local-venda.service';

@Component({
  selector: 'app-local-venda',
  templateUrl: './local-venda.component.html',
  styleUrls: ['./local-venda.component.css']
})

export class LocalVendaComponent implements OnInit {

  public formulario: FormGroup;

  public retorno: any = false;
  public tipoLocalVendaList: any;
  public parceiroList: any;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tipoLocalVendaService: TipoLocalVendaService,
    private parceiroService: ParceiroService,
    private localVendaService: LocalVendaService,
    private utilService: UtilService,
    private mensagemService: MensagemService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      opcoesLocalVenda: [null, Validators.required],
      codigoExterno: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      parceiroLocalVenda: [null, Validators.required],
      tipoLocalVenda: [null, Validators.required],
      situacaoLocalVenda: [null, Validators.required]
    } );

    this.tipoLocalVendaService.list( {} ).subscribe( res => {
      this.tipoLocalVendaList = res;
    } );

    this.parceiroService.list( {} ).subscribe( res => {
      this.parceiroList = res;
    } );

    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }

  }

  onSubmit() { }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if ( filtro.opcoesLocalVenda === '1' && ( !filtro.codigoExterno || filtro.codigoExterno === '' ) ) {
      this.mensagemService.enviarErro( 'Ao menos um dos campos da interface de pesquisa deve ser preenchido.' );
      return;
    }
    if ( filtro.opcoesLocalVenda === '2'
     && !filtro.razaoSocial
     && !filtro.parceiroLocalVenda
     && !filtro.tipoLocalVenda
     && !filtro.situacaoLocalVenda ) {
      this.mensagemService.enviarErro( 'Ao menos um dos campos da interface de pesquisa deve ser preenchido.' );
      return;
    }

    this.localVendaService.list( filtro ).subscribe(
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
  }

  visualizar( e: any ) {
    this.router.navigate( [ '/local-venda',
                            e.seqLocalVenda,
                            e.dataHoraCadastramento,
                            'visualizar' ] );
  }

  novo() {
    this.router.navigate( [ '/local-venda', 'novo' ] );
  }

  editar( e: any ) {
    this.router.navigate( [ '/local-venda', e.seqLocalVenda, e.dataHoraCadastramento, 'editar' ] );
  }

  excluir( e: any ) {
    this.mensagemService.enviarMsgConfirm( 'Deseja realmente excluir esse registro?' ).subscribe( result => {
      if ( result ) {
        this.localVendaService.excluir( e ).subscribe( res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
        } );
      }
    } );
  }
}
