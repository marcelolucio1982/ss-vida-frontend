import { Component, OnInit } from '@angular/core';
import { CadastroProdutoService } from './servico/cadastro-produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { element, by } from 'protractor';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  edited: boolean;

  formulario: FormGroup;

  constructor(
    private cadastroProdutoService: CadastroProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoEmpresas: [null, Validators.required],
      nomeEmpresas: [null, Validators.required],
      razaoSocialEmpresas: [null, Validators.required]
    });

  }

  onSubmit() { }

  cadastrarProduto() {
    alert('cadastro de produto');
    this.router.navigate(['/cadastro-produto/novo']);
  }

  visualizarProduto() {
    this.router.navigate(['/cadastro-produto/visualizar']);
  }

  configurarAcoplados() {
    alert('levando para produtos');
    this.router.navigate(['/configuracao-acoplados/configurar']);
  }

  configurarProduto() {
    this.router.navigate(['/configuracao-produto']);
  }

  configurarDadosGerais() {
    this.router.navigate(['/dados-gerais/novo']);
  }

  div1() {
    alert('abrindo a div ');
    document.getElementById('div1').style.display = 'block';
  }

  div2() {
    alert('abrindo a div segunda vez');
  }

  myFunction(val) {
    alert('The input value has changed. The new value is: ' + val);
  }

}
