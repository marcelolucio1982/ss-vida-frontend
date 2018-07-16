import { Component, OnInit, OnDestroy, HostListener, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';
import { TipoLocalVendaService } from './../../tipo-local-venda/service/tipo-local-venda.service';
import { ParceiroService } from './../../parceiro/service/parceiro.service';
import { LocalVendaService } from './../service/local-venda.service';
import { TipoRedeService } from '../../tipo-rede/service/tipo-rede.service';
import { TipoRelacionamentoService } from '../../tipo-relacionamento/service/tipo-relacionamento.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AgrupadorLocalVendaService } from '../../agrupador-local-venda/service/agrupador-local-venda.service';
import { AbstractControl } from '@angular/forms/src/model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-local-venda-form',
  templateUrl: './local-venda-form.component.html',
  styleUrls: ['./local-venda-form.component.css']
})
export class LocalVendaFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  public tipoLocalVendaList: any;
  public parceiroList: any;
  public tipoRedeList: any;
  public agrupadorList: any;

  public parceiroRelacionamentoRetornoList = new Array();
  public parceiroRelacionamentoList = new Array();
  public tipoLocalVendaRelacionamentoList = new Array();
  public tipoRelacionamentoList = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService,
    private parceiroService: ParceiroService,
    private tipoLocalVendaService: TipoLocalVendaService,
    private tipoRedeService: TipoRedeService,
    private tipoRelacionamentoService: TipoRelacionamentoService,
    private localVendaService: LocalVendaService,
    private agrupadorLocalVendaService: AgrupadorLocalVendaService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group( {
      seqLocalVenda: [null, null],
      dataHoraCadastramento: [null, null],
      parceiro: [null, Validators.required],
      tipoLocalVenda: [null, Validators.required],
      tipoRede: [null, null],
      codigoExterno: [null, Validators.required],
      pessoaPapelNegocio: this.formBuilder.group( {
        pessoa: this.formBuilder.group( {
          cpfCnpj: [null, null],
          nomeRazaoSocial: [null, Validators.required]
        } )
      } ),
      agrupador: [null, null],
      permissaoVenda: [null, Validators.required],
      dataInicioVigencia: [null, Validators.required],
      relacionamentoGroup: this.formBuilder.group( {
        codigoExterno: [{value: '', disabled: true}, Validators.required],
        parceiro: [{value: '', disabled: true}, Validators.required],
        tipoLocalVenda: [{value: '', disabled: true}, Validators.required],
        nomeRazaoSocial: [{value: '', disabled: true}, null],
        tipoRelacionamento: [null, Validators.required]
      } ),
      relacionamentos: [new Array(), null]
    });

    this.formulario.get( 'dataInicioVigencia' ).valueChanges.subscribe( data => {
      const relacionamentoGroup = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( relacionamentoGroup instanceof FormGroup ) {
        if ( data.length === 0 ) {
         relacionamentoGroup.controls[ 'codigoExterno' ].disable();
        } else if ( !this.formulario.controls[ 'parceiro' ].disabled ) {
          relacionamentoGroup.controls[ 'codigoExterno' ].enable();
        }
      }
    } );

    this.formulario.get( 'relacionamentoGroup' ).get( 'parceiro' ).valueChanges.subscribe( data => {
      if ( data && data.codigo ) {
        this.tipoLocalVendaRelacionamentoList = new Array();
        for ( const parceiroRelacionamento of this.parceiroRelacionamentoRetornoList ) {
          if ( data.codigo === parceiroRelacionamento.parceiro.codigo ) {
            let achou = false;
            for ( const tipoLocalVenda of this.tipoLocalVendaRelacionamentoList ) {
              if ( tipoLocalVenda.codigo === parceiroRelacionamento.tipoLocalVenda.codigo ) {
                achou = true;
              }
            }
            if ( !achou ) {
              this.tipoLocalVendaRelacionamentoList.push( parceiroRelacionamento.tipoLocalVenda );
            }
          }
        }
        const relacionamentoGroup = this.formulario.controls[ 'relacionamentoGroup' ];
        if ( relacionamentoGroup instanceof FormGroup ) {
          relacionamentoGroup.controls[ 'tipoLocalVenda' ].enable();
          relacionamentoGroup.controls[ 'tipoLocalVenda' ].setValue( null );
          relacionamentoGroup.controls[ 'nomeRazaoSocial' ].setValue( '' );
        }
      } else {
        const relacionamentoGroup = this.formulario.controls[ 'relacionamentoGroup' ];
        if ( relacionamentoGroup instanceof FormGroup ) {
          relacionamentoGroup.controls[ 'tipoLocalVenda' ].disable();
          relacionamentoGroup.controls[ 'tipoLocalVenda' ].setValue( null );
          relacionamentoGroup.controls[ 'nomeRazaoSocial' ].setValue( '' );
        }
      }
    } );

    this.formulario.get( 'relacionamentoGroup' ).get( 'tipoLocalVenda' ).valueChanges.subscribe( data => {
      if ( data && data.codigo ) {
        const relacionamentoGroup = this.formulario.controls[ 'relacionamentoGroup' ];
        if ( relacionamentoGroup.get( 'parceiro' ).value && relacionamentoGroup instanceof FormGroup ) {
          for ( const parceiroRelacionamento of this.parceiroRelacionamentoRetornoList ) {
            if ( relacionamentoGroup.get( 'parceiro' ).value.codigo === parceiroRelacionamento.parceiro.codigo &&
                 relacionamentoGroup.get( 'tipoLocalVenda' ).value.codigo === parceiroRelacionamento.tipoLocalVenda.codigo ) {
              relacionamentoGroup.controls[ 'nomeRazaoSocial' ].setValue( parceiroRelacionamento.descricao );
              this.utilService.updateMaterializeTextFields();
              break;
            }
          }
        }
      }
    } );

    this.tipoLocalVendaService.list( {} ).subscribe( res1 => {
      this.tipoLocalVendaList = res1;

      this.parceiroService.list( {} ).subscribe( res2 => {
        this.parceiroList = res2;

        this.tipoRedeService.list( { 'situacao': 3 } ).subscribe( res3 => {
          this.tipoRedeList = res3;

          this.tipoRelacionamentoService.list( {} ).subscribe( res4 => {
            this.tipoRelacionamentoList = res4;

            this.agrupadorLocalVendaService.list( {} ).subscribe( res5 => {
              this.agrupadorList = res5;

              this.pathSub = this.route.params.subscribe( params => {
                const codigo = +params[ 'id' ];
                const dataHoraCadastramento = params[ 'dataHoraCadastramento' ];

                if ( codigo && dataHoraCadastramento ) {
                  this.localVendaService.get( codigo, dataHoraCadastramento ).subscribe( res6 => {
                    this.preencherFormulario( res6 );
                  });
                }
              });
            } );
          } );
        } );
      } );
    } );

  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  verificaDataInicioVigencia() {
    if ( this.formulario.controls['dataInicioVigencia'].value &&
         this.formulario.controls['dataInicioVigencia'].value.length > 0 ) {
      const relacionamentoGroup = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( relacionamentoGroup instanceof FormGroup &&
           relacionamentoGroup.controls[ 'codigoExterno' ].value &&
           relacionamentoGroup.controls[ 'codigoExterno' ].value.length > 0 ) {
       return false;
      }
    }
    return true;
  }

  pesquisarRelacionamento() {
    this.utilService.updateMaterializeTextFields();
    this.parceiroRelacionamentoList = new Array();
    this.tipoLocalVendaRelacionamentoList = new Array();
    const localVenda: any = this.formulario.value;
    const relacionamentoGroup = this.formulario.get( 'relacionamentoGroup' );
    if ( relacionamentoGroup instanceof FormGroup ) {
      relacionamentoGroup.controls[ 'nomeRazaoSocial' ].setValue( '' );
      relacionamentoGroup.controls[ 'tipoLocalVenda' ].disable();
      relacionamentoGroup.controls[ 'parceiro' ].enable();
      this.utilService.updateMaterializeTextFields();
    }
    this.localVendaService.findParceirosPorCodigoExterno(
      relacionamentoGroup.get( 'codigoExterno' ).value,
      localVenda.dataInicioVigencia,
      localVenda.parceiro == null ? null : localVenda.parceiro.codigo
     ).subscribe( res => {
        this.parceiroRelacionamentoRetornoList = res;
        for ( const parceiroRelacionamento of res ) {
          let encontrou = false;
          for ( const parceiroRelacionamentoDoArray of this.parceiroRelacionamentoList ) {
            if ( parceiroRelacionamentoDoArray.codigo === parceiroRelacionamento.parceiro.codigo ) {
              encontrou = true;
              break;
            }
          }
          if ( !encontrou ) {
            this.parceiroRelacionamentoList.push( parceiroRelacionamento.parceiro );
          }
        }
        this.utilService.updateMaterializeTextFields();
      } );
      const relacionamentoGroup2 = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( relacionamentoGroup2 instanceof FormGroup ) {
        relacionamentoGroup2.controls[ 'parceiro' ].setValue(
          this.parceiroRelacionamentoList, {  onlySelf: false,
                                              emitEvent: true,
                                              emitModelToViewChange: true,
                                              emitViewToModelChange: true } );
                                              this.utilService.updateMaterializeTextFields();
      }
    this.utilService.updateMaterializeTextFields();
  }

  addRelacionamento() {
    const relacionamentoGroup = this.formulario.get( 'relacionamentoGroup' );
    if ( !relacionamentoGroup.valid ) {
      if ( relacionamentoGroup instanceof FormGroup ) {
        this.utilService.validateAllFormFields( relacionamentoGroup );
      }
    } else {
      const data = relacionamentoGroup.get( 'tipoLocalVenda' ).value;
      if ( data && data.codigo ) {
        const relacionamentoGroupControl = this.formulario.controls[ 'relacionamentoGroup' ];
        if ( relacionamentoGroupControl.get( 'parceiro' ).value && relacionamentoGroupControl instanceof FormGroup ) {
          for ( const parceiroRelacionamento of this.parceiroRelacionamentoRetornoList ) {
            if (  relacionamentoGroupControl.get( 'parceiro' ).value.codigo === relacionamentoGroupControl.value.parceiro.codigo &&
                  relacionamentoGroupControl.get( 'tipoLocalVenda' ).value.codigo ===
                  relacionamentoGroupControl.value.tipoLocalVenda.codigo ) {
              const relacionamentoList = this.formulario.get( 'relacionamentos' ).value;
              relacionamentoList.push( {
                tipoRelacionamento: relacionamentoGroup.get( 'tipoRelacionamento' ).value,
                localVenda: parceiroRelacionamento
              } );
              break;
            }
          }
        }
      }
      this.parceiroRelacionamentoList = null;
      if ( relacionamentoGroup instanceof FormGroup ) {
        relacionamentoGroup.controls[ 'parceiro' ].disable();
      }
      relacionamentoGroup.reset();
    }
  }

  removerRelacionamento( e: any ) {
    const relacionamentoList = this.formulario.get( 'relacionamentoList' ).value;
    if ( relacionamentoList.indexOf( e ) !== -1 ) {
      relacionamentoList.splice( relacionamentoList.indexOf( e ), 1 );
    }
  }

  private preencherFormulario( localVenda ) {
    this.formulario.patchValue( {
      seqLocalVenda: localVenda.seqLocalVenda,
      dataHoraCadastramento: localVenda.dataHoraCadastramento,
      parceiro: this.parceiroList.filter( function( el ) { return el.codigo === localVenda.parceiro.codigo; } )[0],
      tipoLocalVenda: this.tipoLocalVendaList.filter( function( el ) { return el.codigo === localVenda.tipoLocalVenda.codigo; } )[0],
      tipoRede: localVenda.tipoRede != null ?
                this.tipoRedeList.filter( function( el ) { return el.codigo === localVenda.tipoRede.codigo; } )[0] : null,
      codigoExterno: localVenda.codigoExterno,
      pessoaPapelNegocio: localVenda.pessoaPapelNegocio,
      agrupador:  localVenda.agrupador != null ?
                  this.agrupadorList.filter( function( el ) { return el.codigo === localVenda.agrupador.codigo; } )[0] : null,
      permissaoVenda: this.constantesService.getValorSimNao( localVenda.permissaoVenda ),
      dataInicioVigencia: this.utilService.formatarDataVisao( localVenda.dataInicioVigencia ),
      relacionamentos: localVenda.relacionamentos
    } );

    Object.keys( this.formulario.controls ).forEach( key => {
      if ( 'dataInicioVigencia' !== key ) {
        this.formulario.controls[ key ].disable();
      }
    } );

    this.utilService.updateMaterializeTextFields();
  }

  salvar( aprovar: boolean ) {
    this.mensagemService.limparMensagens();
    let temp = this.formulario.controls[ 'relacionamentoGroup' ];
    if ( temp instanceof FormGroup ) {
      temp.controls[ 'codigoExterno' ].disable();
    }
    temp = this.formulario.controls[ 'relacionamentoGroup' ];
    if ( temp instanceof FormGroup ) {
      temp.controls[ 'parceiro' ].disable();
    }
    temp = this.formulario.controls[ 'relacionamentoGroup' ];
    if ( temp instanceof FormGroup ) {
      temp.controls[ 'tipoLocalVenda' ].disable();
    }
    temp = this.formulario.controls[ 'relacionamentoGroup' ];
    if ( temp instanceof FormGroup ) {
      temp.controls[ 'nomeRazaoSocial' ].disable();
    }
    temp = this.formulario.controls[ 'relacionamentoGroup' ];
    if ( temp instanceof FormGroup ) {
      temp.controls[ 'tipoRelacionamento' ].disable();
    }
    if ( this.formulario.valid ) {
      const localVenda: any = this.formulario.getRawValue();
      localVenda.dataInicioVigencia = this.utilService.formatarDataModelo( localVenda.dataInicioVigencia );
      delete localVenda.relacionamentoGroup;
      if ( aprovar ) {
        this.localVendaService.aprovar( localVenda ).subscribe( res => {
          if ( res['seqLocalVenda'] && res['seqLocalVenda'] > 0 ) {
            this.voltar();
            this.mensagemService.enviarMensagem( 'Operação realizada com sucesso' );
          }
        } );
      } else {
        this.localVendaService.salvar( localVenda ).subscribe( res => {
          if ( res['seqLocalVenda'] && res['seqLocalVenda'] > 0 ) {
            this.voltar();
            this.mensagemService.enviarMensagem( 'Local de Venda cadastrado com sucesso' );
          }
        } );
      }
    } else  {
      this.utilService.validateFormFields( this.formulario );
      temp = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( temp instanceof FormGroup ) {
        temp.controls[ 'codigoExterno' ].enable();
      }
      temp = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( temp instanceof FormGroup ) {
        temp.controls[ 'parceiro' ].enable();
      }
      temp = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( temp instanceof FormGroup ) {
        temp.controls[ 'tipoLocalVenda' ].enable();
      }
      temp = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( temp instanceof FormGroup ) {
        temp.controls[ 'nomeRazaoSocial' ].enable();
      }
      temp = this.formulario.controls[ 'relacionamentoGroup' ];
      if ( temp instanceof FormGroup ) {
        temp.controls[ 'tipoRelacionamento' ].enable();
      }
    }
  }

  voltar() {
    this.router.navigate( [ '/local-venda' ] );
  }

  fechar() {
    this.mensagemService.enviarMsgConfirm(
      'Se fechar a página sem salvar irá perder os dados inseridos. Continuar?' ).subscribe( result => {
      if ( result ) {
        this.voltar();
      }
    } );
  }
}
