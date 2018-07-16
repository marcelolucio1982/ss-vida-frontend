import { ConstantesService } from './../../../shared/services/constantes.service';
import { ConfiguracaoProdutoService } from './../servico/configuracao-produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilService } from './../../../shared/services/util.service';
import { MensagemService } from '../../../shared/services/mensagem.service';

@Component({
  selector: 'app-configuracao-assistencias',
  templateUrl: './configuracao-assistencias.component.html',
  styleUrls: ['./configuracao-assistencias.component.scss']
})
export class ConfiguracaoAssistenciasComponent implements OnInit {

  private codigo: number;
  private versao: number;
  public formulario: FormGroup;
  public editarItem = false;
  public listaAssistencias: Array<any> = new Array();
  public listaAssistenciasDetalhe: Array<any> = new Array();
  public listaParceiros: Array<any> = new Array();
  public listaTipoLocalVenda: Array<any> = new Array();
  public listaDominioAssistencias: Array<any> = new Array();
  public listaDominioEmpresaAssistencias: Array<any> = new Array();
  public listaFormaContratacao: Array<any> = new Array();
  public listaAcionamentoAssistencia: Array<any> = new Array();
  public mostrarEventoAssistencias = false;
  public listaEventoAssistencia: Array<any> = new Array();
  public listaBeneficiarioAssistencia: Array<any> = new Array();
  public listaPossuiMaximoAcionamento: Array<any> = new Array();
  public mostrarQuantidadeAcionamento = false;
  public listaTipoLimitacaoAssitencia: Array<any> = new Array();

  constructor(
    private route: ActivatedRoute,
    public utilService: UtilService,
    public mensagemService: MensagemService,
    private formBuilder: FormBuilder,
    private constantesService: ConstantesService,
    private configuracaoProdutoService: ConfiguracaoProdutoService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe( params => {
      this.codigo = +params[ 'id' ];
      this.versao = +params[ 'versao' ];

      this.formulario = this.formBuilder.group({
        assistenciaGroup: this.formBuilder.group( {
          parceiro: [null, Validators.required],
          tipoLocalVenda: [null, Validators.required],
          dominioAssistencia: [null, Validators.required],
          dominioAssistenciaNomeImpressao: [null, null],
          valor: [null, Validators.required],
          empresaAssistencia: [null, Validators.required],
          contrato: [null, null],
          formaContratacao: [null, Validators.required],
          acionamentoAssistencias: [null, null],
          eventoAssistencias: [null, null],
          beneficiarioAssistencias: [null, null],

          maximoAcionamentoAssistencias: [null, null],
          quantidadeAcionamentoAssistencias: [null, null],
          tipoLimitacaoAssitencia: [null, null],

          periodicidadePagamentoConfigAssistencias: [null, null],
          porProfissaoConfigAssistencias: [null, null],
          profissoesLeftConfigAssistencias: [null, null],
          profissoesRighttConfigAssistencias: [null, null],
        }),
      });

      this.configuracaoProdutoService.listAssistencias( this.codigo, this.versao ).subscribe( res => {
        for ( const assistencia of res[ 'data' ] ) {
          this.listaAssistencias.push( assistencia );
        }
        this.utilService.updateMaterializeTextFields();
      });

      this.configuracaoProdutoService.listDominioAssistencias( this.codigo, this.versao ).subscribe( res => {
        this.listaDominioAssistencias = res[ 'data' ];
      });

      this.configuracaoProdutoService.listDominioEmpresaAssistencias( this.codigo, this.versao ).subscribe( res => {
        this.listaDominioEmpresaAssistencias = res[ 'data' ];
      });

      this.configuracaoProdutoService.listFormasContratacao().subscribe( res => {
        this.listaFormaContratacao = res;
      });

      this.configuracaoProdutoService.listDominioAcionamentoAssistencias( this.codigo, this.versao ).subscribe( res => {
        this.listaAcionamentoAssistencia = res[ 'data' ];
      });

      this.configuracaoProdutoService.listDominioBeneficiarioAssistencias( this.codigo, this.versao ).subscribe( res => {
        this.listaBeneficiarioAssistencia = res[ 'data' ];
      });

      this.listaPossuiMaximoAcionamento = this.constantesService.getValoresSimNao();

      this.formulario.get( 'assistenciaGroup' ).get( 'dominioAssistencia' ).valueChanges.subscribe( data => {
        if ( data && data.descricao ) {
          this.formulario.get( 'assistenciaGroup' ).get( 'dominioAssistenciaNomeImpressao' ).setValue( data.descricao );
          this.utilService.updateMaterializeTextFields();
        }
      });

      this.formulario.get( 'assistenciaGroup' ).get( 'acionamentoAssistencias' ).valueChanges.subscribe( data => {
        if ( data && data.codigo === '1' ) {
          this.mostrarEventoAssistencias = true;
        } else {
          this.mostrarEventoAssistencias = false;
        }
      });

      this.formulario.get( 'assistenciaGroup' ).get( 'maximoAcionamentoAssistencias' ).valueChanges.subscribe( data => {
        if ( data && data.codigo === 'S' ) {
          this.mostrarQuantidadeAcionamento = true;
        } else {
          this.mostrarQuantidadeAcionamento = false;
        }
      });
    });
  }

  outro() {

      // for ( const assistenciaDetalhe of res[ 'data' ] ) {
      //   this.configuracaoProdutoService.listAssistenciasDetalhe( codigo,
      // versao,
      // assistenciaDetalhe.parceiro.codigo,
      // assistenciaDetalhe.tipoLocalVenda.codigo,
      // assistenciaDetalhe.assistencia.dataInicioVigencia ).subscribe ( res2 => {
      // for ( const assitencia of res2[ 'data' ] ) {
      //  this.listaAssistencias.push( assitencia );
      // }
      // });
      // }
  }

  incluirItem() {
    this.editarItem = true;

    this.configuracaoProdutoService.listParceiros( this.codigo, this.versao ).subscribe( res => {
      this.listaParceiros = res[ 'data' ];
    });

    this.formulario.get( 'assistenciaGroup' ).get( 'parceiro' ).valueChanges.subscribe( data => {
      if ( data ) {
        this.listaTipoLocalVenda = new Array();
        this.configuracaoProdutoService.listTipoLocalDeVenda( this.codigo, this.versao, data.codigo ).subscribe( res => {
          for ( const tipoLocalVenda of res[ 'data' ] ) {
            let encontrou = false;
            for ( const assistencia of this.listaAssistencias ) {
              if ( data.codigo === assistencia.parceiro.codigo && assistencia.tipoLocalVenda.codigo === tipoLocalVenda.codigo ) {
                encontrou = true;
                break;
              }
            }
            if ( !encontrou ) {
              this.listaTipoLocalVenda.push( tipoLocalVenda );
            }
          }
        });
        if ( this.listaTipoLocalVenda.length === 0 ) {
          this.mensagemService.enviarAlerta( 'Todos os Locais de Venda desse Parceiro já foram configurados.' );
        }
        this.utilService.updateMaterializeTextFields();
      }
    });
  }

}
