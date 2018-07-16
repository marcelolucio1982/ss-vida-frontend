import { query } from '@angular/animations';
import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ComissionadoService } from './../service/comissionado.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';
import { ParceiroComponent } from '../../parceiro/parceiro.component';
import { EmpresasAssistenciaComponent } from '../../../cadastros/empresas-assistencia/empresas-assistencia.component';

@Component({
  selector: 'app-comissionado-form',
  templateUrl: './comissionado-form.component.html',
  styleUrls: ['./comissionado-form.component.css']
})
export class ComissionadoFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  public formulario: FormGroup;

  public tipoComissionadoList: any;
  public corretorSelecionado = false;
  public empresaPrivada = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private comissionadoService: ComissionadoService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      const versao = +params['versao'];
      if ( codigo ) {
        this.formulario = this.formBuilder.group({
          comissionado: [null, null],
          codigo: [null, null],
          cadCnpjParceiro: [null, null],
          cadTipoComissionado: [null, null],
          cadRegistroSusep: [null, null],
          cadRegistroSusepVida: [null, null],
          cadRazaoSocial: [null, null],
          cadCepComissionado: [null, null],
          cadEnderecoComissionado: [null, null],
          cadComplementoComissionado: [null, null],
          cadBairroComissionado: [null, null],
          cadCidadeComissionado: [null, null],
          cadUfComissionado: [null, null],
          cadContatoComissionado: [null, null],
          cadEmailPrincipal: [null, null],
          cadEmailSecundario: [null, null],
          cadFoneComercial: [null, null],
          cadFoneCelular: [null, null],
          cadFoneResidencial: [null, null],
          cadEmpresaPublica: [null, null],
          cadInicioVigenciaComissionado: [null, Validators.required],
          representanteLegal: this.formBuilder.group( {
            cadCpfContato: [null, null],
            cadNomeContato: [null, null],
            cadNumeroIdentidadeContato: [null, null],
            cadOrgaoExpedidorContato: [null, null],
            cadUfIdentidadeContato: [null, null],
            cadDataExpedicaoContato: [null, null],
            cadCepContato: [null, null],
            cadEnderecoContato: [null, null],
            cadComplementoContato: [null, null],
            cadBairroContato: [null, null],
            cadCidadeContato: [null, null],
            cadUfContato: [null, null],
            cadFoneContato: [null, null],
          })
        } );
      } else {
        this.formulario = this.formBuilder.group({
          comissionado: [null, null],
          codigo: [null, null],
          cadCnpjParceiro: [null, Validators.required],
          cadTipoComissionado: [null, Validators.required],
          cadRegistroSusep: [null, null],
          cadRegistroSusepVida: [null, null],
          cadRazaoSocial: [null, Validators.required],
          cadCepComissionado: [null, Validators.required],
          cadEnderecoComissionado: [null, Validators.required],
          cadComplementoComissionado: [null, null],
          cadBairroComissionado: [null, Validators.required],
          cadCidadeComissionado: [null, Validators.required],
          cadUfComissionado: [null, Validators.required],
          cadContatoComissionado: [null, Validators.required],
          cadEmailPrincipal: [null, Validators.required],
          cadEmailSecundario: [null, null],
          cadFoneComercial: [null, Validators.required],
          cadFoneCelular: [null, null],
          cadFoneResidencial: [null, null],
          cadEmpresaPublica: [null, Validators.required],
          cadInicioVigenciaComissionado: [null, Validators.required],
          representanteLegal: this.formBuilder.group( {
            cadCpfContato: [null, Validators.required],
            cadNomeContato: [null, Validators.required],
            cadNumeroIdentidadeContato: [null, Validators.required],
            cadOrgaoExpedidorContato: [null, Validators.required],
            cadUfIdentidadeContato: [null, Validators.required],
            cadDataExpedicaoContato: [null, Validators.required],
            cadCepContato: [null, Validators.required],
            cadEnderecoContato: [null, Validators.required],
            cadComplementoContato: [null, null],
            cadBairroContato: [null, Validators.required],
            cadCidadeContato: [null, Validators.required],
            cadUfContato: [null, Validators.required],
            cadFoneContato: [null, null],
          })
        } );
      }
    } );

    this.formulario.get( 'cadTipoComissionado' ).valueChanges.subscribe( data => {
      if ( data != null && data.codigo === 1 ) {
        this.corretorSelecionado = true;
      } else {
        this.corretorSelecionado = false;
      }
    });

    this.formulario.get( 'cadEmpresaPublica' ).valueChanges.subscribe( data => {
      const relacionamentoGroup = this.formulario.controls[ 'representanteLegal' ];
      if ( relacionamentoGroup instanceof FormGroup ) {
        if ( data != null && data.codigo === 'N' ) {
          this.empresaPrivada = true;
          for ( const subControls of Object.values( relacionamentoGroup.controls ) ) {
            subControls.enable();
          }
        } else {
          this.empresaPrivada = false;
          for ( const subControls of Object.values( relacionamentoGroup.controls ) ) {
            subControls.disable();
          }
        }
      }
    } );

    this.comissionadoService.listTipoComissionado().subscribe( res => {
      this.tipoComissionadoList = res;

      this.pathSub = this.route.params.subscribe( params => {
        const codigo = params[ 'id' ];
        const dataAtualizacao = params[ 'dataAtualizacao' ];
        if ( codigo && dataAtualizacao ) {
          this.comissionadoService.get( codigo, dataAtualizacao ).subscribe( res2 => {
            this.formulario.get( 'comissionado' ).setValue( res2 );
            const foneCelular = res2.papeisNegocio[0].contatos.filter( function( el ) {
              return el.pessoaContato.tipoTelefone.codigo === 6;
            } )[0];
            const foneResidencial = res2.papeisNegocio[0].contatos.filter( function( el ) {
              return el.pessoaContato.tipoTelefone.codigo === 7;
            } )[0];
            this.formulario.patchValue( {
              codigo: res2.codigo,
              cadCnpjParceiro: res2.papeisNegocio[0].pessoa.cpfCnpj,
              cadTipoComissionado: this.tipoComissionadoList.filter( function( el ) {
                return el.codigo === res2.tipoComissionado.codigo;
              } )[0],
              cadRegistroSusep: res2.registroSusep,
              cadRegistroSusepVida: res2.registroSusepVida,
              cadRazaoSocial: res2.nome,
              cadCepComissionado: res2.papeisNegocio[0].enderecos[0].pessoaEndereco.codigoEnderecoPostal,
              cadEnderecoComissionado: res2.papeisNegocio[0].enderecos[0].pessoaEndereco.logradouro,
              cadComplementoComissionado: res2.papeisNegocio[0].enderecos[0].pessoaEndereco.complemento,
              cadBairroComissionado: res2.papeisNegocio[0].enderecos[0].pessoaEndereco.bairro,
              cadCidadeComissionado: res2.papeisNegocio[0].enderecos[0].pessoaEndereco.cidade,
              cadUfComissionado: this.constantesService.getUnidadeFederacao( res2.papeisNegocio[0].enderecos[0].pessoaEndereco.uf.sigla ),
              cadContatoComissionado: res2.papeisNegocio[0].contatos[0].pessoaContato.nome,
              cadEmailPrincipal: res2.papeisNegocio[0].contatos[0].pessoaContato ?
                                 res2.papeisNegocio[0].contatos[0].pessoaContato.email : null,
              cadEmailSecundario: res2.papeisNegocio[0].contatos[1] ?
                                  res2.papeisNegocio[0].contatos[1].pessoaContato.email : null,
              cadFoneComercial: res2.papeisNegocio[0].telefones[0].pessoaTelefone.numeroCompleto,
              cadFoneCelular: foneCelular ? foneCelular.pessoaContato.numeroCompleto : null,
              cadFoneResidencial: foneResidencial ? foneResidencial.pessoaContato.numeroCompleto : null,
              cadEmpresaPublica: this.constantesService.getValorSimNao( res2.indicadorEmpresaPublica ),
              cadInicioVigenciaComissionado: this.utilService.formatarDataVisao( res2.dataInicioVigencia )
            } );
            if ( this.formulario.controls[ 'cadEmpresaPublica' ].value.codigo === 'N' ) {
              const pessoaF = this.formulario.get( 'comissionado' ).value.papeisNegocio.filter( function( el ) {
                return el.pessoa.pessoaFisica;
              } )[0];
              if ( pessoaF != null ) {
                const objFormularioRepresentanteLegal = this.formulario.get( 'representanteLegal' );
                objFormularioRepresentanteLegal.get( 'cadCpfContato' ).setValue( pessoaF.pessoa.cpfCnpj );
                this.pesquisarRepresentanteLegal();
              }
            }
            this.utilService.updateMaterializeTextFields();
          } );
          for ( const control of Object.values( this.formulario.controls ) ) {
            control.disable();
          }
          this.formulario.controls[ 'cadInicioVigenciaComissionado' ].enable();
        }
      } );
    } );
  }

  ngOnDestroy() {
  }

  pesquisarPessoaJuridica() {
    const objFormulario = this.formulario.value;
    const cadCnpjParceiro = this.utilService.removeMask(objFormulario.cadCnpjParceiro);
    if ( cadCnpjParceiro ) {
      this.constantesService.getPessoaJuridica( cadCnpjParceiro ).subscribe( res => {
        this.formulario.patchValue( {
          cadRazaoSocial: res[ 'nomeRazaoSocial' ],
        } );
        this.recuperarUltimoContato( res[ 'codigo' ] );
        this.recuperarUltimoTelefone( res[ 'codigo' ] );
        this.recuperarUltimoEndereco( res[ 'codigo' ] );
        this.utilService.updateMaterializeTextFields();
      } );
    } else {
      this.mensagemService.enviarMensagem( 'Preencher o campo CNPJ' );
    }
  }

  pesquisarRepresentanteLegal() {
    const objFormulario = this.formulario.get( 'representanteLegal' );
    if ( this.formulario.get( 'representanteLegal' ).value[ 'cadCpfContato' ] ) {
      this.constantesService.getPessoaFisica( this.formulario.get( 'representanteLegal' ).value[ 'cadCpfContato' ]  ).subscribe( res => {
        objFormulario.get( 'cadNomeContato' ).setValue( res[ 'nomeRazaoSocial' ] );
        this.constantesService.getDocumentosIdentidade( res[ 'codigo' ], true ).subscribe( res2 => {
          objFormulario.get( 'cadNumeroIdentidadeContato' ).setValue( res2[0].numero );
          objFormulario.get( 'cadOrgaoExpedidorContato' ).setValue( res2[0].orgaoExpedidor );
          objFormulario.get( 'cadUfIdentidadeContato' ).setValue( res2[0].uf.sigla );
          objFormulario.get( 'cadDataExpedicaoContato' ).setValue( this.utilService.formatarDataVisao( res2[0].dataExpedicao ) );
          this.utilService.updateMaterializeTextFields();
        });
        this.constantesService.getTelefones( res[ 'codigo' ], true ).subscribe( res2 => {
          objFormulario.get( 'cadFoneContato' ).setValue( res2[0].numeroCompleto );
          this.utilService.updateMaterializeTextFields();
        });
        this.constantesService.getEnderecos( res[ 'codigo' ], true ).subscribe( res2 => {
          objFormulario.get( 'cadCepContato' ).setValue( res2[0].codigoEnderecoPostal );
          objFormulario.get( 'cadEnderecoContato' ).setValue( res2[0].logradouro );
          objFormulario.get( 'cadComplementoContato' ).setValue( res2[0].complemento );
          objFormulario.get( 'cadBairroContato' ).setValue( res2[0].bairro );
          objFormulario.get( 'cadCidadeContato' ).setValue( res2[0].cidade );
          objFormulario.get( 'cadUfContato' ).setValue( this.constantesService.getUnidadeFederacao( res2[0].uf.sigla ) );
          this.utilService.updateMaterializeTextFields();
        });
      } );
      if ( this.formulario.get( 'comissionado' ).value !== null ) {
        const relacionamentoGroup = this.formulario.controls[ 'representanteLegal' ];
        if ( relacionamentoGroup instanceof FormGroup ) {
          for ( const subControls of Object.values( relacionamentoGroup.controls ) ) {
            subControls.disable();
          }
        }
      }
    } else {
      this.mensagemService.enviarMensagem( 'Preencher o campo CPF' );
    }
  }

  recuperarUltimoContato( codigoPessoa: number ) {
    this.constantesService.getContato( codigoPessoa, true ).subscribe( res => {
      this.formulario.patchValue( {
        cadContatoComissionado: res[0].nome,
        cadEmailPrincipal: res[0].email,
      } );
      this.utilService.updateMaterializeTextFields();
    } );
  }

  recuperarUltimoTelefone( codigoPessoa: number ) {
    this.constantesService.getTelefones( codigoPessoa, true ).subscribe( res => {
      this.formulario.patchValue( {
        cadFoneComercial: res[0].numeroCompleto,
      } );
      this.utilService.updateMaterializeTextFields();
    } );
  }

  recuperarUltimoEndereco( codigoPessoa: number ) {
    this.constantesService.getEnderecos( codigoPessoa, true ).subscribe( res => {
      this.formulario.patchValue( {
        cadBairroComissionado: res[0].bairro,
        cadCidadeComissionado: res[0].cidade,
        cadEnderecoComissionado: res[0].logradouro,
        cadCepComissionado: res[0].codigoEnderecoPostal,
        cadComplementoComissionado: res[0].complemento,
        cadUfComissionado: this.constantesService.getUnidadeFederacao( res[0].uf.sigla ),
      } );
      this.utilService.updateMaterializeTextFields();
    } );
  }

  pesquisarCep() {
    const objFormulario = this.formulario.value;
    const cep = this.utilService.removeMask(objFormulario.cadCepComissionado);
    if ( cep ) {
      this.constantesService.getEnderecoByCep( cep ).subscribe( res => {
        this.formulario.patchValue( {
          cadBairroComissionado: res['bairro'],
          cadComplementoComissionado: res['complemento'],
          cadCidadeComissionado: res['cidade'],
          cadEnderecoComissionado: res['descricao'],
          cadUfComissionado: this.constantesService.getUnidadeFederacao( res['uf'] )
        } );
        this.utilService.updateMaterializeTextFields();
      } );
    } else {
      this.mensagemService.enviarMensagem( 'Preencher o campo CEP' );
    }
  }

  pesquisarCepContato() {
    if ( this.formulario.get( 'representanteLegal' ).get( 'cadCepContato' ).value ) {
      this.constantesService.getEnderecoByCep(
        this.formulario.get( 'representanteLegal' ).get( 'cadCepContato' ).value ).subscribe( res => {
        const objFormulario = this.formulario.get( 'representanteLegal' );
        objFormulario.get( 'cadEnderecoContato' ).setValue( res['descsricao'] );
        objFormulario.get( 'cadComplementoContato' ).setValue( res['complemento'] );
        objFormulario.get( 'cadBairroContato' ).setValue( res['bairro'] );
        objFormulario.get( 'cadCidadeContato' ).setValue( res['cidade'] );
        objFormulario.get( 'cadUfContato' ).setValue( this.constantesService.getUnidadeFederacao( res['uf'] ) );
        this.utilService.updateMaterializeTextFields();
      });
    }
  }

  voltar() {
    this.router.navigate( [ '/comissionado' ] );
  }

  salvar( aprovar: boolean ) {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const comissionado = this.formulario.get( 'comissionado' ).value === null ? {
        papeisNegocio: [{
          telefones: [{
            tipoTelefone: {
              codigo: 1,
              descricao: 'Pessoal',
            },
            pessoaTelefone: {
              numeroCompleto: this.utilService.removeMask(this.formulario.get( 'cadFoneComercial' ).value),
            },
          }],
          enderecos: [{
            tipoEndereco: {
              codigo: 4,
            },
            pessoaEndereco: {
              codigoEnderecoPostal: this.formulario.get( 'cadCepComissionado' ).value,
              logradouro: this.formulario.get( 'cadEnderecoComissionado' ).value,
              complemento: this.formulario.get( 'cadComplementoComissionado' ).value,
              bairro: this.formulario.get( 'cadBairroComissionado' ).value,
              cidade: this.formulario.get( 'cadCidadeComissionado' ).value,
              uf: this.formulario.get( 'cadUfComissionado' ).value,
            },
          }],
          contatos: [{
            pessoaContato: {
              nome: this.formulario.get( 'cadContatoComissionado' ).value,
              email: this.formulario.get( 'cadEmailPrincipal' ).value,
              numeroCompleto: this.utilService.removeMask(this.formulario.get( 'cadFoneResidencial' ).value),
              tipoTelefone: {
                codigo: 6,
                descricao: 'Celular'
              },
            },
          }],
          tipoPapelNegocio : {
            codigo: 4
          },
          pessoa: {
            cpfCnpj: this.utilService.removeMask(this.formulario.get( 'cadCnpjParceiro' ).value),
            nomeRazaoSocial: this.formulario.get( 'cadRazaoSocial' ).value,
            pessoaJuridica: true,
          },
        }],
        tipoComissionado: this.formulario.get( 'cadTipoComissionado' ).value,
        registroSusep: this.formulario.get( 'cadRegistroSusep' ).value,
        registroSusepVida: this.formulario.get( 'cadRegistroSusepVida' ).value,
        indicadorEmpresaPublica: this.formulario.get( 'cadEmpresaPublica' ).value,
        dataInicioVigencia: null,
      } : this.formulario.get( 'comissionado' ).value;
      if ( comissionado.papeisNegocio[0].tipoPapelNegocio ) {
        comissionado.papeisNegocio[0].tipoPapelNegocio.codigo = 4;
      } else {
        comissionado.papeisNegocio[0].tipoPapelNegocio = { codigo: 4 };
      }
      comissionado.dataInicioVigencia =  this.utilService.formatarDataModelo(
                                          this.formulario.get( 'cadInicioVigenciaComissionado' ).value );
     /* if ( this.formulario.get( 'cadFoneResidencial' ).value !== null ) {
        comissionado.papeisNegocio[0].contatos[1] = {
          pessoaContato: {
            numeroCompleto: this.utilService.removeMask(this.formulario.get( 'cadFoneResidencial' ).value),
            tipoTelefone: {
              codigo: 7,
              descricao: 'Residencial',
            }
          }
        };
      }*/
      if ( this.formulario.get( 'cadEmailSecundario' ).value !== null && this.formulario.get( 'cadEmailSecundario' ).value !== '' ) {
        if ( comissionado.papeisNegocio[0].contatos[1] === undefined ) {
          comissionado.papeisNegocio[0].contatos[1] = {};
        }
        if ( comissionado.papeisNegocio[0].contatos[1].pessoaContato === undefined ) {
          comissionado.papeisNegocio[0].contatos[1].pessoaContato = {};
        }
        comissionado.papeisNegocio[0].contatos[1].pessoaContato.nome = this.formulario.get( 'cadContatoComissionado' ).value;
        comissionado.papeisNegocio[0].contatos[1].pessoaContato.email = this.formulario.get( 'cadEmailSecundario' ).value;
      }
      if ( this.formulario.get( 'representanteLegal' ).get( 'cadFoneContato' ).value  ) {
        if ( comissionado.papeisNegocio[1] === undefined ) {
          comissionado.papeisNegocio[1] = {
            telefones: [{
              tipoTelefone: {
                codigo: 3,
                descricao: 'Contato',
              },
              pessoaTelefone: {
                numeroCompleto: this.utilService.removeMask(this.formulario.get( 'representanteLegal' ).get( 'cadFoneContato' ).value),
              },
            }]
          };
        }
      }
      if ( this.formulario.get( 'representanteLegal' ).get( 'cadCepContato' ).value ) {
        if ( comissionado.papeisNegocio[1] === undefined ) {
          comissionado.papeisNegocio[1] = {};
        }
        comissionado.papeisNegocio[1].enderecos = [{
          tipoEndereco: {
            codigo: 6,
          },
          pessoaEndereco: {
            codigoEnderecoPostal: this.utilService.removeMask(this.formulario.get( 'representanteLegal' ).get( 'cadCepContato' ).value),
              logradouro: this.formulario.get( 'representanteLegal' ).get( 'cadEnderecoContato' ).value,
              complemento: this.formulario.get( 'representanteLegal' ).get( 'cadComplementoContato' ).value,
              bairro: this.formulario.get( 'representanteLegal' ).get( 'cadBairroContato' ).value,
              cidade: this.formulario.get( 'representanteLegal' ).get( 'cadCidadeContato' ).value,
              uf: this.formulario.get( 'representanteLegal' ).get( 'cadUfContato' ).value,
          },
        }];
        comissionado.papeisNegocio[1].tipoPapelNegocio = {
          codigo: 15,
        };
        comissionado.papeisNegocio[1].pessoa = {
          cpfCnpj: this.utilService.removeMask(this.formulario.get( 'representanteLegal' ).get( 'cadCpfContato' ).value),
          nomeRazaoSocial: this.formulario.get( 'representanteLegal' ).get( 'cadNomeContato' ).value,
          pessoaFisica: true,
          identidades: [{
            numero: this.formulario.get( 'representanteLegal' ).get( 'cadNumeroIdentidadeContato' ).value,
            dataExpedicao: this.formulario.get( 'representanteLegal' ).get( 'cadDataExpedicaoContato' ).value,
            orgaoExpedidor: this.formulario.get( 'representanteLegal' ).get( 'cadOrgaoExpedidorContato' ).value,
            uf: this.formulario.get( 'representanteLegal' ).get( 'cadUfIdentidadeContato' ).value,
          }],
        };
      }
      if ( this.formulario.get( 'comissionado' ).value != null ) {
        comissionado.papeisNegocio[0].contatos[0].pessoaContato.numeroCompleto = '';
        this.comissionadoService.atualizar( aprovar, comissionado).subscribe( res => {
          this.router.navigate( [ '/comissionado' ] );
          this.mensagemService.enviarMensagem( 'Operação realizada com sucesso.' );
        });
      } else {
        comissionado.versao = 0;
        this.comissionadoService.criar( aprovar, comissionado ).subscribe( res => {
          if ( res.codigo !== null ) {
            this.router.navigate( [ '/comissionado' ] );
            this.mensagemService.enviarMensagem( 'Operação realizada com sucesso.' );
          }
        });
      }
    } else  {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }
}
