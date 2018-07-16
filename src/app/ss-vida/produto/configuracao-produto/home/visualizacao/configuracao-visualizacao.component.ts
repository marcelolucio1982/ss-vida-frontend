import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from './../../../../shared/services/mensagem.service';
import { ConfiguracaoProdutoService } from './../../servico/configuracao-produto.service';
import { UtilService } from './../../../../shared/services/util.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-configuracao-visualizacao',
  templateUrl: './configuracao-visualizacao.component.html',
  styleUrls: ['./configuracao-visualizacao.component.scss']
})
export class ConfiguracaoVisualizacaoComponent implements OnInit {

  public produtoDetalhe: any;
  public configuracaoProduto: any;
  public coberturasDetalhe: Array<any> = new Array();
  public assistenciasDetalhe: Array<any> = new Array();
  public acopladosDetalhe: Array<any> = new Array();
  public comissaoDetalhe: Array<any> = new Array();
  public cobrancasDetalhe: Array<any> = new Array();
  public codigo: number;
  public versao: number;
  
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public utilService: UtilService,
    private mensagemService: MensagemService,
    private configuracaoProdutoService: ConfiguracaoProdutoService,
  ) { }

  ngOnInit() {

    $('h5.dadosGerais').click(function(){
      $(this).parent().find('div.dadosGerais').slideToggle('fast');
    });
    $('h5.periodicidadePagamento').click(function(){
      $(this).parent().find('div.periodicidadePagamento').slideToggle('fast');
    });
    $('h5.permissaoVenda').click(function(){
      $('div.permissaoVenda').slideToggle('fast');
    });
    $('h5.cobertura').click(function(){
      $(this).parent().find('div.cobertura').slideToggle('fast');
    });
    $('h5.assistenciaServicos').click(function(){
      $(this).parent().find('div.assistenciaServicos').slideToggle('fast');
    });
    $('h5.acoplados').click(function(){
      $(this).parent().find('div.acoplados').slideToggle('fast');
    });
    $('h5.comissao').click(function(){
      $(this).parent().find('div.comissao').slideToggle('fast');
    });
    $('h5.capitalSegurado').click(function(){
      $(this).parent().find('div.capitalSegurado').slideToggle('fast');
    });
    $('h5.cobranca').click(function(){
      $(this).parent().find('div.cobranca').slideToggle('fast');
    });


    this.route.parent.params.subscribe( params => {
      const codigo = +params[ 'id' ];
      const versao = +params[ 'versao' ];

      this.codigo = codigo;
      this.versao = versao;

      this.configuracaoProdutoService.get( { produto: { 'codigo': codigo, 'versao': versao } } ).subscribe( res => {
        this.produtoDetalhe = res[ 'data' ];
        this.configuracaoProdutoService.listCoberturas( codigo, versao ).subscribe( res2 => {
          for ( const tempCodigoCobertura of res2 ) {
            this.configuracaoProdutoService.getCoberturaDetalhe( codigo, versao, tempCodigoCobertura.codigo ).subscribe( res3 => {
              this.coberturasDetalhe.push( res3 );
            });
          }
        });
        this.configuracaoProdutoService.listAssistencias( codigo, versao ).subscribe( res2 => {
          for ( const tempCodigoParceiro of res2[ 'data' ] ) {
            this.configuracaoProdutoService.listAssistenciasDetalhe(
              codigo, versao,
              tempCodigoParceiro.parceiro.codigo,
              tempCodigoParceiro.tipoLocalVenda.codigo,
              tempCodigoParceiro.tipoLocalVenda.dataInicioVigencia ).subscribe( res3 => {
              this.assistenciasDetalhe.push( res3[ 'data' ] );
            });
          }
        });
        this.configuracaoProdutoService.listAcoplados( codigo, versao ).subscribe( res2 => {
          for ( const tempCodigoParceiro of res2[ 'data' ] ) {
            this.configuracaoProdutoService.listAcopladosDetalhe( codigo, versao,
                                                                  tempCodigoParceiro.parceiro.codigo,
                                                                  tempCodigoParceiro.tipoLocalVenda.codigo,
                                                                  tempCodigoParceiro.tipoLocalVenda.dataInicioVigencia
                                                                ).subscribe( res3 => {
              this.acopladosDetalhe.push( res3[ 'data' ] );
            });
          }
        });
        this.configuracaoProdutoService.listComissoes( codigo, versao ).subscribe( res2 => {
          for ( const tempComissao of res2[ 'data' ] ) {
            this.configuracaoProdutoService.listComissoesDetalhe( codigo, versao, tempComissao.codigoComissao ).subscribe( res3 => {
              this.comissaoDetalhe.push( res3[ 'data' ] );
            });
          }
        });
        this.configuracaoProdutoService.listCobranca( codigo, versao ).subscribe( res2 => {
          for ( const tempCobranca of res2[ 'data' ] ) {
            this.cobrancasDetalhe.push( tempCobranca );
            this.configuracaoProdutoService.listCobrancasDetalhe( codigo, versao, tempCobranca.codigoCobranca ).subscribe( res3 => {
              for ( const cobranca of this.cobrancasDetalhe ) {
                if ( cobranca.codigoCobranca === res3[ 'data' ].codigoCobranca &&
                     cobranca.parceiro.codigo === res3[ 'data' ].parceiro.codigo &&
                     cobranca.tipoLocalVenda.codigo === res3[ 'data' ].tipoLocalVenda.codigo ) {
                  cobranca.parcelasAdesao = res3[ 'data' ].parcelasAdesao;
                  cobranca.demaisParcelas = res3[ 'data' ].demaisParcelas;
                  cobranca.inadimplencias = res3[ 'data' ].inadimplencias;
                }
              }
            });
          }
        });

      });
    });
  }
  criarEvento() {
    const codigoProduto = this.codigo;
    const codigoCobertura = this.coberturasDetalhe[0].codigo;
    this.configuracaoProdutoService.emitir(codigoProduto, codigoCobertura ).subscribe( retorno => {
         this.mensagemService.enviarErro('Evento enviado com Sucesso');
      });
    }
  dadosGerais() {}
  cobranca() {}
  comissao() {}
  acoplados() {}
  assistenciaServicos() {}
  cobertura() {}
  permissaoVenda() {}
  periodicidadePagamento() {}

}
