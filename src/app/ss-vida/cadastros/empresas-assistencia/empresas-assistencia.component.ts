import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { EmpresasAssistenciaService } from './service/empresas-assistencia.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-empresas-assistencia',
  templateUrl: './empresas-assistencia.component.html',
  styleUrls: ['./empresas-assistencia.component.scss']
})
export class EmpresasAssistenciaComponent implements OnInit {

  public modalActions1 = new EventEmitter<string|MaterializeAction>();
  public model1Params: any;
  public formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private empresasAssistenciaService: EmpresasAssistenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    private utilService: UtilService,
    public constantesService: ConstantesService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoEmpresaAssistencia: [null, Validators.required],
      nome: [null, Validators.required],
      razaoSocial: [null, Validators.required],
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
    this.router.navigate(['/empresas-assistencia/novo']);
  }

  visualizar(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao]);
  }

  editar(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao, 'editar']);
  }

  gerarVersao(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao, 'novo']);
  }

  encerrar(empresaAssistencia) {
    this.router.navigate(['/empresas-assistencia', empresaAssistencia.codigo, 'versoes', empresaAssistencia.versao, 'encerrar']);
  }

  excluir(empresaAssistencia) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.empresasAssistenciaService.delete({'codigo': empresaAssistencia.codigo, 'versao': empresaAssistencia.versao,
        'dataAtualizacao': empresaAssistencia.dataAtualizacao}).subscribe(res => {
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
          this.pesquisar();
        });
       }
     });

  }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    if (!filtro.codigoEmpresaAssistencia && !filtro.nome && !filtro.razaoSocial) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.empresasAssistenciaService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe Empresa de Assistência conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

}
