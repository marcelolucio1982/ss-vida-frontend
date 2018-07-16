import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { CoberturaService } from './service/cobertura.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styleUrls: ['./cobertura.component.css']
})

export class CoberturaComponent implements OnInit {

  public formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private coberturaService: CoberturaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      detalhado: ['true', Validators.required],
      codigoCobertura: [null, Validators.required],
      nome: [null, Validators.required],
      sigla: [null, Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.onSubmit();
    }
  }

  onSubmit() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if (!filtro.codigoCobertura && !filtro.sigla && !filtro.nome) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.coberturaService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe cobertura conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

  cadastrarCobertura() {
    this.router.navigate(['/cobertura/novo']);
  }

  visualizarCobertura(idCobertura: number) {
    this.router.navigate(['/cobertura', idCobertura]);
  }

}
