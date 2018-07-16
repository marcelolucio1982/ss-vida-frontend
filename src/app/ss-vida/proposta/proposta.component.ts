/* tslint:disable:no-access-missing-member */
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConstantesService } from '../shared/services/constantes.service';
import { MensagemService } from '../shared/services/mensagem.service';
import { UtilService } from '../shared/services/util.service';
import { PropostaService } from './service/proposta.service';
import { Paginable } from './../shared/paginable';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent extends Paginable implements OnInit {

  public formulario: FormGroup;
  public situacaoPropostaList: any;
  public situacaoApoliceList: any;
  public retorno: any = false;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    private propostaService: PropostaService
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      tipoDeProposta: ['', Validators.required],
      tipoPesquisaProposta: ['', Validators.required],
      cpfGroup: this.formBuilder.group( {
        numCpf: [null, Validators.required],
      } ),
      nomeGroup: this.formBuilder.group( {
        nome: [null, Validators.required],
      } ),
      propostaGroup: this.formBuilder.group( {
        proposta: [null, Validators.required],
      } ),
      situacaoPropostaGroup: this.formBuilder.group( {
        situacaoProposta: [null, Validators.required],
      } ),
      produtoGroup: this.formBuilder.group( {
        produto: [null, Validators.required]
      } ),
      dataGroup: this.formBuilder.group( {
        periodoInicial: [null, Validators.required],
        periodoFinal: [null, Validators.required]
      } ),
    } );

    this.propostaService.findSituacoesProposta().subscribe( res => {
      this.situacaoPropostaList = res;
    } );

    this.propostaService.findSituacaoApolice().subscribe( res => {
      this.situacaoApoliceList = res;
    } );

    this.formulario.get( 'tipoDeProposta' ).valueChanges.subscribe( data => {
      this.formulario.controls[ 'tipoPesquisaProposta' ].setValue( null );
    });

    this.formulario.get( 'tipoPesquisaProposta' ).valueChanges.subscribe( data => {
      this.formulario.controls[ 'cpfGroup' ].disable();
      this.formulario.controls[ 'nomeGroup' ].disable();
      this.formulario.controls[ 'propostaGroup' ].disable();
      this.formulario.controls[ 'situacaoPropostaGroup' ].disable();
      this.formulario.controls[ 'produtoGroup' ].disable();
      this.formulario.controls[ 'dataGroup' ].disable();
      switch ( data ) {
        case '1': {
          this.formulario.controls[ 'cpfGroup' ].enable();
          break;
        }
        case '2': {
          this.formulario.controls[ 'nomeGroup' ].enable();
          break;
        }
        case '4': {
          this.formulario.controls[ 'propostaGroup' ].enable();
          break;
        }
        case '6': {
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
        case '7': {
          this.formulario.controls[ 'situacaoPropostaGroup' ].enable();
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
        case '8': {
          this.formulario.controls[ 'produtoGroup' ].enable();
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
        case '9': {
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
      }
    } );
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.get( 'tipoDeProposta' ).setValue( this.utilService.getFiltroPesquisa( this.router.url ).tipoDeProposta );
      this.formulario.get( 'tipoPesquisaProposta' ).setValue( this.utilService.getFiltroPesquisa( this.router.url ).tipoPesquisaProposta );
      switch ( this.utilService.getFiltroPesquisa( this.router.url ).tipoPesquisaProposta ) {
        case '1': {
          this.formulario.controls[ 'cpfGroup' ].get( 'numCpf' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).cpfGroup.numCpf );
          break;
        }
        case '2': {
          this.formulario.controls[ 'nomeGroup' ].get( 'nome' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).nomeGroup.nome );
          break;
        }
        case '4': {
          this.formulario.controls[ 'propostaGroup' ].get( 'proposta' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).propostaGroup.proposta );
          break;
        }
        case '7': {
          this.formulario.controls[ 'situacaoPropostaGroup' ].get( 'situacaoProposta' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).situacaoPropostaGroup.situacaoProposta );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoInicial' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoInicial );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoFinal' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoFinal );
          break;
        }
        case '8': {
          this.formulario.controls[ 'produtoGroup' ].get( 'produto' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).produtoGroup.produto );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoInicial' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoInicial );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoFinal' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoFinal );
          break;
        }
        case '9': {
          this.formulario.controls[ 'dataGroup' ].get( 'periodoInicial' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoInicial );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoFinal' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoFinal );
          break;
        }
      }
      this.pesquisar();
    }
  }

  pesquisar(isNovaPesquisa: boolean = false ) {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {

      this.loading = true;

      if (isNovaPesquisa) {
        this.total = 0;
      }

      if ( +this.formulario.controls[ 'tipoDeProposta' ].value === 1 ) {
        this.propostaService.listar( {
          'filtroDePesquisa': this.formulario.get( 'tipoPesquisaProposta' ).value,
          'cpf': this.formulario.get( 'cpfGroup' ).get( 'numCpf' ).value,
          'nome': this.formulario.get( 'nomeGroup' ).get( 'nome' ).value,
          'situacao': this.formulario.get( 'situacaoPropostaGroup' ).get( 'situacaoProposta' ).value != null ?
                      this.formulario.get( 'situacaoPropostaGroup' ).get( 'situacaoProposta' ).value.codigo : null,
          'situacaoApolice': null,
          'nossoNumero': null,
          'numeroApolice': null,
          'numeroProposta': this.formulario.get( 'propostaGroup' ).get( 'proposta' ).value,
          'periodoInicial': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoInicial' ).value ),
          'periodoFinal': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoFinal' ).value ),
          'linhaInicial': this.utilService.getLinhaInicial( this.page, this.limit ),
          'linhaFinal': this.utilService.getLinhaFinal( this.page, this.limit ),
          'quantidadeRegistros': this.total
        } ).subscribe( res => {
          if ( res.length > 0 ) {
            this.total = res[0].quantidadeRegistros;
          }
          this.retorno = res;
          this.loading = false;
          if ( this.retorno && this.retorno.length === 0 ) {
            this.mensagemService.enviarMensagem( 'Não existe proposta conforme informação inserida(s) no(s) campo(s).' );
          } else {
            this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
          }
        } );
      } else {
        this.propostaService.listarEmCriticas( {
          'situacao': 0,
          'codigoProduto': +this.formulario.get( 'produtoGroup' ).get( 'produto' ).value,
          'periodoInicial': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoInicial' ).value ),
          'periodoFinal': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoFinal' ).value ),
        } ).subscribe( res => {
          this.retorno = res;
          if ( this.retorno && this.retorno.length === 0 ) {
            this.mensagemService.enviarMensagem( 'Não existe proposta conforme informação inserida(s) no(s) campo(s).' );
          } else {
            this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
          }
        });
      }
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  public visualizar( e: any ) {
    this.router.navigate( [ `/proposta/${e.numeroPropostaExterna}` ] );
  }

}
