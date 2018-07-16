/* tslint:disable:no-access-missing-member */
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConstantesService } from '../shared/services/constantes.service';
import { MensagemService } from '../shared/services/mensagem.service';
import { UtilService } from '../shared/services/util.service';
import { EndossoService } from './service/endosso.service';
import { Paginable } from './../shared/paginable';

@Component({
  selector: 'app-endosso',
  templateUrl: './endosso.component.html',
  styleUrls: ['./endosso.component.css']
})
export class EndossoComponent extends Paginable implements OnInit {

  public formulario: FormGroup;
  public situacaoEndossoList: any;
  public situacaoApoliceList: any;
  public retorno: any = false;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    private endossoService: EndossoService
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      tipoDeEndosso: ['', Validators.required],
      tipoPesquisaEndosso: ['', Validators.required],
      cpfGroup: this.formBuilder.group( {
        numCpf: [null, Validators.required],
      } ),
      nomeGroup: this.formBuilder.group( {
        nome: [null, Validators.required],
      } ),
      endossoGroup: this.formBuilder.group( {
        endosso: [null, Validators.required],
      } ),
      situacaoEndossoGroup: this.formBuilder.group( {
        situacaoEndosso: [null, Validators.required],
      } ),
      produtoGroup: this.formBuilder.group( {
        produto: [null, Validators.required]
      } ),
      dataGroup: this.formBuilder.group( {
        periodoInicial: [null, Validators.required],
        periodoFinal: [null, Validators.required]
      } ),
    } );

    this.endossoService.findSituacoesEndosso().subscribe( res => {
      this.situacaoEndossoList = res;
    } );

    this.endossoService.findSituacaoApolice().subscribe( res => {
      this.situacaoApoliceList = res;
    } );

    this.formulario.get( 'tipoDeEndosso' ).valueChanges.subscribe( data => {
      this.formulario.controls[ 'tipoPesquisaEndosso' ].setValue( null );
    });

    this.formulario.get( 'tipoPesquisaEndosso' ).valueChanges.subscribe( data => {
      this.formulario.controls[ 'cpfGroup' ].disable();
      this.formulario.controls[ 'nomeGroup' ].disable();
      this.formulario.controls[ 'endossoGroup' ].disable();
      this.formulario.controls[ 'situacaoEndossoGroup' ].disable();
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
          this.formulario.controls[ 'endossoGroup' ].enable();
          break;
        }
        case '6': {
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
        case '7': {
          this.formulario.controls[ 'situacaoEndossoGroup' ].enable();
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
  }

  pesquisar(isNovaPesquisa: boolean = false ) {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {

      this.loading = true;

      if (isNovaPesquisa) {
        this.total = 0;
      }

      if ( +this.formulario.controls[ 'tipoDeEndosso' ].value === 1 ) {
        this.endossoService.listar( {
          'filtroDePesquisa': this.formulario.get( 'tipoPesquisaEndosso' ).value,
          'cpf': this.formulario.get( 'cpfGroup' ).get( 'numCpf' ).value,
          'nome': this.formulario.get( 'nomeGroup' ).get( 'nome' ).value,
          'situacao': this.formulario.get( 'situacaoEndossoGroup' ).get( 'situacaoEndosso' ).value != null ?
                      this.formulario.get( 'situacaoEndossoGroup' ).get( 'situacaoEndosso' ).value.codigo : null,
          'situacaoApolice': null,
          'nossoNumero': null,
          'numeroApolice': null,
          'numeroEndosso': this.formulario.get( 'endossoGroup' ).get( 'endosso' ).value,
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
            this.mensagemService.enviarMensagem( 'Não existe endosso conforme informação inserida(s) no(s) campo(s).' );
          }
        } );
      } else {
        this.endossoService.listarEmCriticas( {
          'situacao': 0,
          'codigoProduto': +this.formulario.get( 'produtoGroup' ).get( 'produto' ).value,
          'periodoInicial': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoInicial' ).value ),
          'periodoFinal': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoFinal' ).value ),
        } ).subscribe( res => {
          this.retorno = res;
          if ( this.retorno && this.retorno.length === 0 ) {
            this.mensagemService.enviarMensagem( 'Não existe endosso conforme informação inserida(s) no(s) campo(s).' );
          }
        });
      }
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  public visualizar( e: any ) {
    this.router.navigate( [ `/endosso/${e.numeroEndossoExterna}` ] );
  }

  cadastrar() {
    this.router.navigate(['/endosso/cadastrar']);
  }
}
