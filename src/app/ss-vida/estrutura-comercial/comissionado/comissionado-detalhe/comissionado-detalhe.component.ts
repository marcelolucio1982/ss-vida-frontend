import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from './../../../shared/services/util.service';
import { ComissionadoService } from '../service/comissionado.service';
import { ConstantesService } from '../../../shared/services/constantes.service';

@Component({
  selector: 'app-comissionado-detalhe',
  templateUrl: './comissionado-detalhe.component.html',
  styleUrls: ['./comissionado-detalhe.component.css']
})
export class ComissionadoDetalheComponent implements OnInit, OnDestroy {

  public comissionado: any;
  public representanteLegal: any = false;
  public documentosIdentidade: any;
  public telefones: any;
  public enderecos: any;

  private pathSub: any;

  constructor(
    public constantesService: ConstantesService,
    private router: Router,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private comissionadoService: ComissionadoService
  ) { }

  ngOnInit() {
    this.pathSub = this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      const dataAtualizacao = params[ 'dataAtualizacao' ];
      this.comissionadoService.get( codigo, dataAtualizacao ).subscribe( res => {
        this.comissionado = res;
        if ( this.comissionado.indicadorEmpresaPublica.codigo === 'N' ) {
          this.pesquisarRepresentanteLegal();
        }
      });
    });
  }

  pesquisarRepresentanteLegal() {
    const pessoaF = this.comissionado.papeisNegocio.filter( function( el ) {
      return el.pessoa.pessoaFisica;
    } )[0];
    if ( pessoaF != null ) {
      this.constantesService.getPessoaFisica( pessoaF.pessoa.cpfCnpj  ).subscribe( res => {
        this.representanteLegal = res;
        this.constantesService.getDocumentosIdentidade( res[ 'codigo' ], true ).subscribe( res2 => {
          this.documentosIdentidade = res2[0];
        });
        this.constantesService.getTelefones( res[ 'codigo' ], true ).subscribe( res2 => {
          this.telefones = res2[0];
        });
        this.constantesService.getEnderecos( res[ 'codigo' ], true ).subscribe( res2 => {
          this.enderecos = res2[0];
        });
      });
    }
  }


  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  telefoneComercial() {
    return this.telefone( 1 );
  }

  telefoneCelular() {
    return this.telefone( 6 );
  }

  telefoneResidencial() {
    return this.telefone( 7 );
  }

 telefone( tipo ) {
    let result = null;
    if ( this.comissionado ) {
      for ( const contato of this.comissionado.papeisNegocio[0].contatos ) {
        if ( contato.pessoaContato.tipoTelefone.codigo === tipo ) {
          result = contato.pessoaContato.numeroTelefone;
          break;
        }
      }
      if ( result === null ) {
        for ( const telefone of this.comissionado.papeisNegocio[0].telefones ) {
          if ( telefone.tipoTelefone.codigo === tipo ) {
            result = telefone.pessoaTelefone.numeroCompleto;
            break;
          }
        }
      }
    }
    return result;
  }

  voltar() {
    this.router.navigate( [ '/comissionado' ] );
  }
}
