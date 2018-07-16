import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { AssistenciaService } from './service/assistencia.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-assistencia',
  templateUrl: './assistencia.component.html',
  styleUrls: ['./assistencia.component.css']
})

export class AssistenciaComponent implements OnInit {

  public formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private assistenciaService: AssistenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    private utilService: UtilService,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoAssistencia: [null, Validators.required],
      descricao: [null, Validators.required],
      situacao: [null, Validators.required],
      detalhado: ['true', Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  cadastrar() {
    this.router.navigate(['/assistencia/novo']);
  }

  visualizar(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao]);
  }

  editar(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao, 'editar']);
  }

  gerarVersao(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao, 'novo']);
  }

  encerrar(assistencia) {
    this.router.navigate(['/assistencia', assistencia.codigo, 'versoes', assistencia.versao, 'encerrar']);
  }

  excluir(assistencia) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.assistenciaService.delete({'codigo': assistencia.codigo, 'versao': assistencia.versao,
        'dataAtualizacao': assistencia.dataAtualizacao}).subscribe(res => {
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
          this.pesquisar();
        });
       }
     });

  }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if (!filtro.codigoAssistencia && !filtro.descricao && filtro.situacao === null) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.assistenciaService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe assistência conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

}
