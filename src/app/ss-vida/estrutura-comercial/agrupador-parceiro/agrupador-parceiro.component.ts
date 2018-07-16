import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { AgrupadorParceiroService } from './service/agrupador-parceiro.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-agrupador-parceiro',
  templateUrl: './agrupador-parceiro.component.html',
  styleUrls: ['./agrupador-parceiro.component.css']
})

export class AgrupadorParceiroComponent implements OnInit {

  public retorno: any = false;
  public formulario: FormGroup;

  constructor(
    private router: Router,
    private agrupadorParceiroService: AgrupadorParceiroService,
    public constantesService: ConstantesService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private mensagemService: MensagemService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null, Validators.required],
      situacao: [null, Validators.required]
    });
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
    if ( !filtro.descricao && filtro.situacao === null ) {
      this.mensagemService.enviarErro( 'Ao menos um dos campos da interface de pesquisa deve ser preenchido.' );
      return;
    }

    this.agrupadorParceiroService.list( filtro ).subscribe(
      res => {
        this.retorno = res;
        if  ( !this.retorno || this.retorno.length === 0 ) {
          this.mensagemService.enviarErro( 'Não existe assistência conforme informação inserida(s) no(s) campo(s).' );
          this.retorno = false;
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

  novo() {
    this.router.navigate( [ '/agrupador-parceiro', 'novo' ] );
  }

  editar( e: any ) {
    this.router.navigate( [ '/agrupador-parceiro', e.codigo, e.dataInicioVigencia, e.dataHoraAtualizacao, 'editar' ] );
  }

  visualizar( e: any ) {
    this.router.navigate( [ '/agrupador-parceiro', e.codigo, e.dataInicioVigencia, e.dataHoraAtualizacao, 'visualizar' ] );
  }

  encerrar( e: any ) {
    this.router.navigate( [ '/agrupador-parceiro', e.codigo, e.dataInicioVigencia, e.dataHoraAtualizacao, 'encerrar' ] );
  }

  excluir( e: any ) {
    this.mensagemService.enviarMsgConfirm( 'Deseja realmente excluir esse registro?' ).subscribe( result => {
      if ( result ) {
        this.agrupadorParceiroService.excluir( e ).subscribe( res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
        } );
      }
    } );
  }
}
