import { AgrupadorLocalVendaFormComponent } from './agrupador-local-venda-form/agrupador-local-venda-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { AgrupadorLocalVendaService } from './service/agrupador-local-venda.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-agrupador-local-venda',
  templateUrl: './agrupador-local-venda.component.html',
  styleUrls: ['./agrupador-local-venda.component.css']
})

export class AgrupadorLocalVendaComponent implements OnInit {

  public retorno: any = false;
  public formulario: FormGroup;

  constructor(
    private router: Router,
    private agrupadorLocalVendaService: AgrupadorLocalVendaService,
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

    this.agrupadorLocalVendaService.list( filtro ).subscribe(
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

  novo() {
    this.router.navigate( [ '/agrupador-local-venda', 'novo' ] );
  }

  editar( e: any ) {
    this.router.navigate( [ '/agrupador-local-venda', e.codigo, e.dataInicioVigencia, e.dataHoraCadastramento, 'editar' ] );
  }

  visualizar( e: any ) {
    this.router.navigate( [ '/agrupador-local-venda', e.codigo, e.dataInicioVigencia, e.dataHoraCadastramento, 'visualizar' ] );
  }

  encerrar( e: any ) {
    this.router.navigate( [ '/agrupador-local-venda', e.codigo, e.dataInicioVigencia, e.dataHoraCadastramento, 'encerrar' ] );
  }

  excluir( e: any ) {
    this.mensagemService.enviarMsgConfirm( 'Deseja realmente excluir esse registro?' ).subscribe( result => {
      if ( result ) {
        this.agrupadorLocalVendaService.excluir( e ).subscribe( res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
        } );
      }
    } );
  }
}
