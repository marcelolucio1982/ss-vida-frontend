import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { TipoRedeService } from './service/tipo-rede.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-tipo-rede',
  templateUrl: './tipo-rede.component.html',
  styleUrls: ['./tipo-rede.component.css']
})

export class TipoRedeComponent implements OnInit {

  public formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private tipoRedeService: TipoRedeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private utilService: UtilService,
    public constantesService: ConstantesService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      situacao: [null, Validators.required],
      descricao: [null, Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  cadastrar() {
    this.router.navigate(['/tipo-rede/novo']);
  }

  visualizar(tipoRede) {
    this.router.navigate(['/tipo-rede', tipoRede.codigo,
      'vigencia', tipoRede.dataInicioVigencia, 'atualizacao', tipoRede.dataHoraAtualizacao]);
  }

  editar(tipoRede) {
    this.router.navigate(['/tipo-rede', tipoRede.codigo,
    'vigencia', tipoRede.dataInicioVigencia, 'atualizacao', tipoRede.dataHoraAtualizacao, 'editar']);
  }

  encerrar(tipoRede) {
    this.router.navigate(['/tipo-rede', tipoRede.codigo,
    'vigencia', tipoRede.dataInicioVigencia, 'atualizacao', tipoRede.dataHoraAtualizacao, 'encerrar']);
  }

  excluir(tipoRede) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.tipoRedeService.delete({'codigo': tipoRede.codigo,
        'dataInicioVigencia': tipoRede.dataInicioVigencia,
        'dataHoraAtualizacao': tipoRede.dataHoraAtualizacao}).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
       }
     });
  }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if (!filtro.descricao && filtro.situacao === null) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.tipoRedeService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe Tipo de Rede conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }
}
