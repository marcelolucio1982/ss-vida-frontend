import { UtilService } from './../../shared/services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { ParceiroService } from './service/parceiro.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { AgrupadorParceiroService } from './../agrupador-parceiro/service/agrupador-parceiro.service';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})

export class ParceiroComponent implements OnInit {

  public formulario: FormGroup;
  public retorno: any = false;
  public agrupadoresParceiro: any = false;

  constructor(
    private parceiroService: ParceiroService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private agrupadorParceiroService: AgrupadorParceiroService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.getAgrupadoresParceiro();

    this.formulario = this.formBuilder.group({
      cnpj: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      codigoAgrupador: [null, Validators.required],
      codigoSituacao: [null, Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  cadastrar() {
    this.router.navigate(['/parceiro/novo']);
  }

  visualizar(parceiro) {
    this.router.navigate(['/parceiro', parceiro.codigo,
      'vigencia', parceiro.dataInicioVigencia, 'atualizacao', parceiro.dataHoraCadastramento]);
  }

  editar(parceiro) {
    this.router.navigate(['/parceiro', parceiro.codigo,
      'vigencia', parceiro.dataInicioVigencia, 'atualizacao', parceiro.dataHoraCadastramento, 'editar']);
  }

  encerrar(parceiro) {
    this.router.navigate(['/parceiro', parceiro.codigo,
      'vigencia', parceiro.dataInicioVigencia, 'atualizacao', parceiro.dataHoraCadastramento, 'encerrar']);
  }

  excluir(parceiro) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(result => {
      if (result) {
        this.parceiroService.delete({
          'codigo': parceiro.codigo,
          'dataInicioVigencia': parceiro.dataInicioVigencia,
          'dataHoraCadastramento': parceiro.dataHoraCadastramento
        }).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
      }
    });
  }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if (!filtro.cnpj && !filtro.razaoSocial && filtro.codigoAgrupador === null && filtro.codigoSituacao === null) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.parceiroService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe Parceiro conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

  getAgrupadoresParceiro() {
    this.agrupadorParceiroService.list({}).subscribe(
      res => {this.agrupadoresParceiro = res; }
      );
  }

}
