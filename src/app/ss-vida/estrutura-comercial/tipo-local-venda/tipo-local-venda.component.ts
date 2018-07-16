import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { TipoLocalVendaService } from './service/tipo-local-venda.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-tipo-local-venda',
  templateUrl: './tipo-local-venda.component.html',
  styleUrls: ['./tipo-local-venda.component.css']
})

export class TipoLocalVendaComponent implements OnInit {

  public formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private tipoLocalVendaService: TipoLocalVendaService,
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
      descricao: [null, Validators.required],
      pesquisa: ['true', Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  cadastrar() {
    this.router.navigate(['/tipo-local-venda/novo']);
  }

  visualizar(tipoLocalVenda) {
    this.router.navigate(['/tipo-local-venda', tipoLocalVenda.codigo,
      'vigencia', tipoLocalVenda.dataInicioVigencia, 'atualizacao', tipoLocalVenda.dataHoraAtualizacao]);
  }

  editar(tipoLocalVenda) {
    this.router.navigate(['/tipo-local-venda', tipoLocalVenda.codigo,
    'vigencia', tipoLocalVenda.dataInicioVigencia, 'atualizacao', tipoLocalVenda.dataHoraAtualizacao, 'editar']);
  }

  encerrar(tipoLocalVenda) {
    this.router.navigate(['/tipo-local-venda', tipoLocalVenda.codigo,
    'vigencia', tipoLocalVenda.dataInicioVigencia, 'atualizacao', tipoLocalVenda.dataHoraAtualizacao, 'encerrar']);
  }

  excluir(tipoLocalVenda) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.tipoLocalVendaService.delete({'codigo': tipoLocalVenda.codigo,
        'dataInicioVigencia': tipoLocalVenda.dataInicioVigencia,
        'dataHoraAtualizacao': tipoLocalVenda.dataHoraAtualizacao}).subscribe(res => {
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

    this.tipoLocalVendaService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe Tipo de local de venda conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

}
