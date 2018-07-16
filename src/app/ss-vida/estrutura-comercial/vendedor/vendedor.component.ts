import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { trigger, animate, transition, style, query } from '@angular/animations';

import { LoginService } from './../../login/service/login.service';
import { VendedorService } from './service/vendedor.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})

export class VendedorComponent implements OnInit {

  formulario: FormGroup;
  retorno: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private vendedorService: VendedorService,
    private route: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) {
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cpf: [null, Validators.required],
      nome: [null, Validators.required],
      codigoExterno: [null, Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  pesquisar () {

    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;
    filtro.cpf = this.utilService.removeMask(filtro.cpf);
    if (!filtro.cpf && !filtro.nome && !filtro.codigoExterno) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.vendedorService.list(filtro).subscribe(
      res => {
        this.retorno = res['data'];
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe vendedor conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );

  }

  cadastrar() {
    this.router.navigate(['/vendedor/novo']);
  }

  visualizar(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento]);
  }

  editar(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento, 'editar']);
  }

  gerarVersao(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento, 'novo']);
  }

  encerrar(vendedor) {
    this.router.navigate(['/vendedor', vendedor.seqVendedor, 'dthCadastramento', vendedor.dataHoraCadastramento, 'encerrar']);
  }

  excluir(vendedor) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.vendedorService.delete({'seqVendedor': vendedor.seqVendedor, 'dataInicioVigencia': vendedor.dataInicioVigencia,
        'dataHoraCadastramento': vendedor.dataHoraCadastramento}).subscribe(res => {
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
          this.pesquisar();
        });
       }
     });

  }

}
