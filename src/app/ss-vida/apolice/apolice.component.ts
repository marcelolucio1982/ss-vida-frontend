/* tslint:disable:no-access-missing-member */
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConstantesService } from '../shared/services/constantes.service';
import { MensagemService } from '../shared/services/mensagem.service';
import { UtilService } from '../shared/services/util.service';
import { ApoliceService } from './service/apolice.service';
import { Paginable } from './../shared/paginable';

@Component({
  selector: 'app-apolice',
  templateUrl: './apolice.component.html',
  styleUrls: ['./apolice.component.css']
})
export class ApoliceComponent extends Paginable implements OnInit {

  public formulario: FormGroup;
  public situacaoApoliceList: any;
  public retorno: any = false;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    private apoliceService: ApoliceService
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      tipoPesquisaApolice: ['', Validators.required],
      cpfGroup: this.formBuilder.group( {
        numCpf: [null, Validators.required],
      } ),
      nomeGroup: this.formBuilder.group( {
        nome: [null, Validators.required],
      } ),
      apoliceGroup: this.formBuilder.group( {
        apolice: [null, Validators.required],
      } ),
      propostaGroup: this.formBuilder.group( {
        proposta: [null, Validators.required],
      } ),
      situacaoApoliceGroup: this.formBuilder.group( {
        situacaoApolice: [null, Validators.required],
      } ),
      produtoGroup: this.formBuilder.group( {
        produto: [null, Validators.required]
      } ),
      dataGroup: this.formBuilder.group( {
        periodoInicial: [null, Validators.required],
        periodoFinal: [null, Validators.required]
      } ),
    } );

    this.apoliceService.findSituacaoApolice().subscribe( res => {
      this.situacaoApoliceList = res;
    } );

    this.formulario.get( 'tipoPesquisaApolice' ).valueChanges.subscribe( data => {
      this.formulario.controls[ 'cpfGroup' ].disable();
      this.formulario.controls[ 'nomeGroup' ].disable();
      this.formulario.controls[ 'apoliceGroup' ].disable();
      this.formulario.controls[ 'propostaGroup' ].disable();
      this.formulario.controls[ 'situacaoApoliceGroup' ].disable();
      this.formulario.controls[ 'produtoGroup' ].disable();
      this.formulario.controls[ 'dataGroup' ].disable();
      switch ( data ) {
        case '11': {
          this.formulario.controls[ 'cpfGroup' ].enable();
          break;
        }
        case '12': {
          this.formulario.controls[ 'nomeGroup' ].enable();
          break;
        }
        case '13': {
          this.formulario.controls[ 'apoliceGroup' ].enable();
          break;
        }
        case '14': {
          this.formulario.controls[ 'propostaGroup' ].enable();
          break;
        }
        case '16': {
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
        case '18': {
          this.formulario.controls[ 'situacaoApoliceGroup' ].enable();
          this.formulario.controls[ 'dataGroup' ].enable();
          break;
        }
      }
    } );
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      console.log( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.formulario.get( 'tipoPesquisaApolice' ).setValue( this.utilService.getFiltroPesquisa( this.router.url ).tipoPesquisaApolice );
      switch ( this.utilService.getFiltroPesquisa( this.router.url ).tipoPesquisaApolice ) {
        case '11': {
          this.formulario.controls[ 'cpfGroup' ].get( 'numCpf' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).cpfGroup.numCpf );
          break;
        }
        case '12': {
          this.formulario.controls[ 'nomeGroup' ].get( 'nome' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).nomeGroup.nome );
          break;
        }
        case '13': {
          this.formulario.controls[ 'apoliceGroup' ].get( 'apolice' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).apoliceGroup.apolice );
          break;
        }
        case '14': {
          this.formulario.controls[ 'propostaGroup' ].get( 'proposta' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).propostaGroup.proposta );
          break;
        }
        case '16': {
          this.formulario.controls[ 'dataGroup' ].get( 'periodoInicial' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoInicial );
          this.formulario.controls[ 'dataGroup' ].get( 'periodoFinal' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).dataGroup.periodoFinal );
          break;
        }
        case '18': {
          this.formulario.controls[ 'situacaoPropostaGroup' ].get( 'situacaoApolice' )
            .setValue( this.utilService.getFiltroPesquisa( this.router.url ).situacaoPropostaGroup.situacaoApolice );
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

  pesquisar( apertouBotao: boolean = false ): void {
    this.mensagemService.limparMensagens();
    if ( apertouBotao ) {
      this.page = 1;
      this.total = 0;
    }
    if ( this.formulario.valid ) {

      this.loading = true;

      this.apoliceService.listar( {
        'filtroDePesquisa': this.formulario.get( 'tipoPesquisaApolice' ).value,
        'cpf': this.formulario.get( 'cpfGroup' ).get( 'numCpf' ).value,
        'nome': this.formulario.get( 'nomeGroup' ).get( 'nome' ).value,
        'situacao': null,
        'situacaoApolice': this.formulario.get( 'situacaoApoliceGroup' ).get( 'situacaoApolice' ).value != null ?
                           this.formulario.get( 'situacaoApoliceGroup' ).get( 'situacaoApolice' ).value.codigo : null,
        'nossoNumero': null,
        'numeroProposta': this.formulario.get( 'propostaGroup' ).get( 'proposta' ).value,
        'numeroApolice': this.formulario.get( 'apoliceGroup' ).get( 'apolice' ).value,
        'periodoInicial': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoInicial' ).value ),
        'periodoFinal': this.utilService.formatarDataModelo( this.formulario.get( 'dataGroup' ).get( 'periodoFinal' ).value ),
        'linhaInicial': this.utilService.getLinhaInicial( this.page, this.limit ),
        'linhaFinal': this.utilService.getLinhaFinal( this.page, this.limit ),
        'quantidadeRegistros': this.total,
      } ).subscribe( res => {
        if ( res.length > 0 ) {
          this.total = res[0].quantidadeRegistros;
        }
        // this.utilService.paginar(this.page, this.limit, res);
        this.retorno = res;
        this.loading = false;
        if ( this.retorno && this.retorno.length === 0 ) {
          this.mensagemService.enviarMensagem( 'Não existe apolice conforme informação inserida(s) no(s) campo(s).' );
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      } );
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  visualizar( e: any ) {
    this.router.navigate( [ `/apolice/${e.numeroApolice}` ] );
  }
  visualizacao() {
    this.router.navigate(['/apolice/detalhe']);
  }
}
