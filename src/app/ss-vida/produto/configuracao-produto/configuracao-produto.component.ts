import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConstantesService } from './../../shared/services/constantes.service';
import { CadastroProdutoService } from './../cadastro-produto/servico/cadastro-produto.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { UtilService } from './../../shared/services/util.service';
import { ConfiguracaoProdutoService } from './servico/configuracao-produto.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-configuracao-produto',
  templateUrl: './configuracao-produto.component.html',
  styleUrls: ['./configuracao-produto.component.scss']
})
export class ConfiguracaoProdutoComponent implements OnInit {

  public formulario: FormGroup;
  retorno: any = false;
  retornoVersoes: any = false;

  public produtosNaoConfigurados: any = false;
  exibePesquisaConfiguracao: boolean;
  exibeGridProdutosConfigurados: boolean;
  exibeConfiguracaoNova: boolean;
  exibeDashboard: boolean;

  produtoTitulo: any = false;
  produto: any = false;
  exibeHeaderProduto: boolean;

  constructor(
    private configuracaoProdutoService: ConfiguracaoProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public utilService: UtilService,
    private mensagemService: MensagemService,
    private produtoService: CadastroProdutoService,
    public constantesService: ConstantesService,
  ) { }

  ngOnInit() {

    this.exibePesquisaConfiguracao = true;
    this.formulario = this.formBuilder.group({
      produtoSelecionado: [null, Validators.required],
      codigoProduto: [null, Validators.required],
      nomeProduto: [null, Validators.required],
      isConfigurado: [true, null],

      produtoReadOnly: this.formBuilder.group({
        codigo: [{value: '', disabled: true}, null],
        descricao: [{value: '', disabled: true}, null],
        codigoProcessoSusep: [{value: '', disabled: true}, null],
        versaoProduto: [{value: '', disabled: true}, null],
        statusDescricao: [{value: '', disabled: true}, null],
        dataInicioVigencia: [{value: '', disabled: true}, null]
      })
    });

    this.utilService.configurarInputData(this.formulario.get('produtoReadOnly'), 'dataInicioVigencia');

    this.formulario.get( 'produtoSelecionado' ).valueChanges.subscribe( data => {
      if ( data && data.codigo ) {
        // this.produto = data;
        // this.produtoTitulo = data.codigo + ' - ' + data.descricao;
        // this.exibeDashboard = true;
        // this.exibeDadosGerais = true;
      }
    } );

    $(document).ready(function() {
      $('tr').css('border', '1px solid #ff0000');
            // Colorindo a TR ao ser clicada
            $('tr').click(function(){
              alert('testando');
              $('tr').removeClass('colorir');
              $(this).addClass('colorir');
            });
          });
   }


  onSubmit() { }


  btnNovo() {

    this.formulario.get( 'produtoSelecionado' ).setValue(undefined);

    this.getProdutosNaoConfigurados();

    // esconder campos de pesquisa de conf de produto
    this.exibePesquisaConfiguracao = false;

    // exibir o select de produtos para configurar
    this.exibeConfiguracaoNova = true;

    // desabilita os demais cards para forçar prencher primeiro os dados gerais

    // FIXME: por enquanto cards estao desabilitados
    this.exibeDashboard = false;

    // esconde listagem de conf de produtos
    this.exibeGridProdutosConfigurados = false;
    this.exibeHeaderProduto = false;
  }

  btnCancelar() {
    this.exibeConfiguracaoNova = false;
    this.exibePesquisaConfiguracao = true;
    this.exibeDashboard = false;
  }

  visualizar(produto) {
    // Cards desabilitados temporariamente
    /*this.exibeDadosGerais = true;
    this.exibeCoberturas = true;
    this.exibeAssistencias = true;
    this.exibeAcoplados = true;
    this.exibePrecificacao = true;
    this.exibeComissao = true;
    this.exibeCobranca = true;
    this.exibeSubscricao = true;
    this.exibeImportacao = true;
    this.exibeResumo = true;*/

    this.produtoService.listVersoes(produto).subscribe(
      res => {
        this.retornoVersoes = res['data'];
        if (!this.retornoVersoes || this.retornoVersoes.length === 0) {
          this.mensagemService.enviarErro('Não existe produto para a versão selecionada.');
        } else {

          this.exibeHeaderProduto = true;
          this.exibeDashboard = true;
          this.produtoTitulo = produto.codigo + ' - ' + produto.descricao;
          this.exibePesquisaConfiguracao = false;
          this.exibeGridProdutosConfigurados = false;

          this.formulario.patchValue({
            produtoReadOnly: {
              codigo: produto.codigo,
              descricao: produto.descricao
            }
          });
        }
      }
    );
  }

  visualizarVersao(produto) {
    this.router.navigate( [ '/configuracao-produto/configurar',
      produto.codigo, 'versao',
      produto.versaoProduto ] );
    this.exibeDashboard = false;
  }

  pesquisarProduto() {
    this.exibeGridProdutosConfigurados = true;
    this.exibeDashboard = false;

    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;

    if ((!filtro.codigoProduto) && (!filtro.nomeProduto)) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.produtoService.list(filtro, true).subscribe(
      res => {
        this.retorno = res['data'];
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe produto conforme informação inserida(s) no(s) campo(s).');
        }
      }
    );
  }

  voltarBusca() {
    this.exibePesquisaConfiguracao = true;
    this.exibeGridProdutosConfigurados = true;
    this.exibeDashboard = false;
    this.exibeHeaderProduto = false;
  }

  getProdutosNaoConfigurados() {
    if ( this.produtosNaoConfigurados ) {
      return this.produtosNaoConfigurados;
    }

    this.produtoService.list({isConfigurado: false}).subscribe(
      res => {this.produtosNaoConfigurados = res['data']; }
    );
  }
}
