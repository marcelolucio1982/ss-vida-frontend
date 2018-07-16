import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

import { ConstantesService } from './../../../shared/services/constantes.service';
import { UtilService } from './../../../shared/services/util.service';
import { MensagemService } from '../../../shared/services/mensagem.service';
import { ApoliceService } from '../../service/apolice.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-endosso-cadastrar',
  templateUrl: './endosso-cadastrar.component.html',
  styleUrls: ['./endosso-cadastrar.component.scss']
})
export class EndossoCadastrarComponent implements OnInit {

  public apolice: any;
  public propostaEndosso: any;
  public dadosPessoais: any;
  public beneficiariosList: any;
  public dadosContato: any;
  public motivosEndosso = new Array();
  public motivosEndossoAdicionados = new Array();
  public listaUfs = new Array();
  public listaTipoTelefones = new Array();
  public listaTipoTelefonesAdicionados = new Array();
  public listaEnderecos = new Array();
  public listaTelefones = new Array();
  public listaEmails = new Array();
  public mostrarAlterarBeneficiarios = false;
  public mostrarAlterarDadosPessoaFisica = false;
  public mostrarAlterarEnderecoTelefoneEmail = false;
  public mostrarPesquisaEndereco = false;
  public mostrarPesquisaTelefone = false;
  public mostrarPesquisaEmail = false;

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private apoliceService: ApoliceService,
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group( {
      origem: [null, Validators.required],
      dataInicioVigencia: [null, Validators.required],
      motivoEndosso: [null, Validators.required],
      beneficiarios: this.formBuilder.group( {
        nome: [null, Validators.required],
        grauParentesco: [null, Validators.required],
        descParentesco: [null, Validators.required],
        percentual: [null, Validators.required],
        cpf: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        sexo: [null, Validators.required],
      }),
      dadosCadastrais: this.formBuilder.group( {
        nome: [null, Validators.required],
      }),
      enderecoTelefoneEmail: this.formBuilder.group( {
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        complemento: [null, null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
        formTelefone: this.formBuilder.group( {
          tipoTelefone: [null, Validators.required],
          ddi: [null, Validators.required],
          ddd: [null, Validators.required],
          numeroTelefone: [null, Validators.required],
        }),
        telefones: this.formBuilder.array([]),
        email: [null, Validators.required],
        preferenciaCorreio: [false],
        preferenciaSms: [false],
        preferenciaEmail: [false],
      }),
    });

    this.listaTipoTelefones = this.constantesService.findTipoTelefones();

    this.route.parent.params.subscribe( params => {
      const codigo = params[ 'id' ];

      this.apoliceService.findMotivosEndossos( codigo ).subscribe( res2 => {
        this.motivosEndosso = res2['data'];
      });

      this.apoliceService.get( codigo ).subscribe( res => {
        this.apolice = res;

        this.route.url.subscribe( url => {
          if ( url[url.length - 1].path === 'cadastrar' ) {
            this.apoliceService.createEndosso( codigo ).subscribe( res2 => {
              if ( 'OPERAÇÃO REALIZADA COM SUCESSO.' ===  res2['data'] ) {
                this.apoliceService.getPropostaEndosso( codigo ).subscribe( res3 => {
                  this.propostaEndosso = res3['data'];
                  this.formulario.patchValue( {
                    origem: this.propostaEndosso.areaSolicitante,
                    dataInicioVigencia: this.utilService.formatarDataVisao( this.propostaEndosso.inicioVigencia ),
                  });
                  this.utilService.updateMaterializeTextFields();
                });
              }
            });
          } else {
            this.apoliceService.getPropostaEndosso( codigo ).subscribe( res2 => {
              this.propostaEndosso = res2['data'];
              this.formulario.patchValue( {
                origem: this.propostaEndosso.areaSolicitante,
                dataInicioVigencia: this.utilService.formatarDataVisao( this.propostaEndosso.inicioVigencia ),
              });
              if ( this.propostaEndosso.motivosEndossados.cliente === 'S' ) {
                this.editar( 1 );
              }
              if ( this.propostaEndosso.motivosEndossados.emailTelefoneEndereco === 'S' ) {
                this.editar( 25 );
              }
              this.utilService.updateMaterializeTextFields();
            });
          }
        });

      });
    });

  }

  public setAreaSolicitante() {
    this.apoliceService.setAreaSolicitante( this.apolice.codigo,
                                            this.formulario.get( 'origem' ).value,
                                            this.propostaEndosso.proposta.numeroProposta,
                                            1 ).subscribe( res => {
    });
  }

  pesquisarCep() {
    this.constantesService.getEnderecoByCep( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'cep' ).value ).subscribe( res => {
      this.formulario.patchValue( {
        enderecoTelefoneEmail: {
          logradouro: res['descricao'],
          complemento: res['complemento'],
          bairro: res['bairro'],
          cidade: res['cidade'],
          uf: this.constantesService.getUnidadeFederacao( res['uf'] ),
        }
      });
      this.utilService.updateMaterializeTextFields();
    });
  }

  public limparEndereco() {
    this.formulario.get( 'enderecoTelefoneEmail' ).reset();
  }

  public limparTelefone() {
    this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).reset();
  }

  public adicionar() {
    this.editar( this.formulario.get( 'motivoEndosso' ).value.codigo );
  }

  public editar( motivo: number ) {
    switch ( motivo ) {
      case 1: {
        this.apoliceService.getDadosPessoais( this.apolice.codigo ).subscribe( res => {
          this.dadosPessoais = res;
          this.formulario.get( 'dadosCadastrais' ).patchValue( {
            nome: this.dadosPessoais.pessoa.nome,
          });
          this.mostrarAlterarDadosPessoaFisica = true;
          this.utilService.updateMaterializeTextFields();
        });
        this.motivosEndossoAdicionados.push( this.motivosEndosso.filter( (subject) => subject.codigo === 1 )[0] );
        this.motivosEndosso = this.motivosEndosso.filter( (subject) => subject.codigo !== 1 );
        this.utilService.updateMaterializeTextFields();
        break;
      }
      case 5: {
        this.apoliceService.getBeneficiarios( this.apolice.codigo ).subscribe( res => {
          this.beneficiariosList = res['data'];
          this.mostrarAlterarBeneficiarios = true;
        });
        this.motivosEndossoAdicionados.push( this.motivosEndosso.filter( (subject) => subject.codigo === 5 )[0] );
        this.motivosEndosso = this.motivosEndosso.filter( (subject) => subject.codigo !== 5 );
        this.utilService.updateMaterializeTextFields();
        break;
      }
      case 25: {
        this.apoliceService.getContato( this.apolice.codigo ).subscribe( res => {
          this.dadosContato = res;
          this.formulario.get( 'enderecoTelefoneEmail' ).patchValue( {
            cep: this.dadosContato.endereco.cep,
            logradouro: this.dadosContato.endereco.logradouro,
            complemento: this.dadosContato.endereco.complemento,
            bairro: this.dadosContato.endereco.bairro,
            cidade: this.dadosContato.endereco.cidade,
            uf: this.constantesService.getUnidadeFederacao( this.dadosContato.endereco.uf.sigla ),
            email: this.dadosContato.email.email,
          });
          for ( const telefone of this.dadosContato.telefones ) {
            ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).
            controls[ 'telefones' ] ).push( this.formBuilder.group( { telefone } ) );
            this.listaTipoTelefonesAdicionados.push(
              this.listaTipoTelefones.filter( (subject) => subject.codigo === telefone.tipo.codigo )[0] );
            this.listaTipoTelefones = this.listaTipoTelefones.filter( (subject) => subject.codigo !== telefone.tipo.codigo );
          }
          this.mostrarAlterarEnderecoTelefoneEmail = true;
          this.motivosEndossoAdicionados.push( this.motivosEndosso.filter( (subject) => subject.codigo === 25 )[0] );
          this.motivosEndosso = this.motivosEndosso.filter( (subject) => subject.codigo !== 25 );
          this.utilService.updateMaterializeTextFields();
        });
        break;
      }
    }
  }

  getBeneficiariosList(){
    return this.beneficiariosList;
  }

  public incluirBeneficiario() {
    if ( this.formulario.get( 'beneficiarios' ).valid ) {

      const pessoa = {
        nome: this.formulario.get( 'beneficiarios' ).get( 'nome' ).value,
        cpfCnpj: this.utilService.removeMask(this.formulario.get( 'beneficiarios' ).get( 'cpf' ).value),
        dataNascimento: this.utilService.formatarDataModelo(this.formulario.get( 'beneficiarios' ).get( 'dataNascimento' ).value),
        sexo : this.constantesService.getGenero(this.formulario.get( 'beneficiarios' ).get( 'sexo' ).value )
      };

      const beneficiario = {
        pessoa: pessoa,
        parentesco : this.constantesService.getParentesco(this.formulario.get( 'beneficiarios' ).get( 'grauParentesco' ).value ),
        percentualParticipacao: this.formulario.get( 'beneficiarios' ).get( 'percentual' ).value
      };

      this.beneficiariosList.push(beneficiario);

    } else {
      this.utilService.validateFormFields( this.formulario.get( 'beneficiarios' ) as FormGroup );
    }
  }

  public limparBeneficiarioForm() {
    this.formulario.get( 'beneficiarios' ).reset();
  }

  public editarBeneficiario(beneficiario: any) {
    this.formulario.get( 'beneficiarios' ).reset();
    this.formulario.patchValue( {
      beneficiarios: {
        nome: beneficiario.pessoa.nome,
        grauParentesco: this.constantesService.getParentesco( beneficiario.parentesco ),
        descParentesco: beneficiario.parentesco.descricao,
        percentual: beneficiario.percentualParticipacao,
        cpf: beneficiario.pessoa.cpfCnpj,
        dataNascimento: beneficiario.pessoa.dataNascimento,
        sexo: this.constantesService.getGenero( beneficiario.pessoa.sexo)
      }
    }),
    this.utilService.updateMaterializeTextFields();
  }

  public deleteBeneficiario(beneficiario: any) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if ( result ) {
        const index= this.beneficiariosList.indexOf(beneficiario);
        this.beneficiariosList.splice(index, 1);
      }
    });    
  }

  public salvarAlterarBeneficiarios() {

    this.mensagemService.limparMensagens();
    if(this.formulario.get( 'beneficiarios' ).valid) {
      this.apoliceService.salvarBeneficiarios( this.apolice.codigo, this.beneficiariosList ).subscribe( res => {
        this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
      });
    } else {
      this.utilService.validateAllFormFields(<FormGroup>this.formulario.get( 'beneficiarios'));
    }
  }

  public removerAlterarBeneficiarios() {
    
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.apoliceService.removeMotivoEndosso( this.apolice.codigo, 5 ).subscribe( res => {
          
          this.motivosEndosso.push( this.motivosEndossoAdicionados.filter( (subject) => subject.codigo === 5 )[0] );
          if ( this.motivosEndossoAdicionados.length === 1 ) {
            this.motivosEndossoAdicionados.pop();
          } else {
            this.motivosEndossoAdicionados = this.motivosEndossoAdicionados.filter( (subject) => subject.codigo !== 5 );
          }
          this.mostrarAlterarBeneficiarios = false;
          this.utilService.updateMaterializeTextFields();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });

      }
     });
  }

  public salvarAlterarDadosPessoaFisica() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.get( 'dadosCadastrais' ).valid) {
    this.dadosPessoais.pessoa.nome = this.formulario.get( 'dadosCadastrais' ).get( 'nome' ).value;
    this.apoliceService.salvarDadosPessoais( this.apolice.codigo, this.dadosPessoais ).subscribe( res => {
      this.mensagemService.enviarMensagem('Operação realizada com sucesso!'); });
    } else {
      this.utilService.validateAllFormFields(<FormGroup>this.formulario.get( 'dadosCadastrais'));
    }
  }

  public salvarAlterarEnderecoTelefoneEmail() {
    this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).disable();
    if ( !this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaCorreio' ).value &&
         !this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaSms' ).value &&
         !this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaEmail' ).value ) {
      this.mensagemService.enviarAlerta( 'Deve ser selecionado ao menos uma preferência de contato' );
    } else {
      if ( this.formulario.get( 'enderecoTelefoneEmail' ).valid ) {
        const preferenciaContato = false;
        this.dadosContato.endereco.cep = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'cep' ).value;
        this.dadosContato.endereco.logradouro = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'logradouro' ).value;
        this.dadosContato.endereco.complemento = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'complemento' ).value;
        this.dadosContato.endereco.bairro = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'bairro' ).value;
        this.dadosContato.endereco.cidade = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'cidade' ).value;
        this.dadosContato.endereco.uf = this.formulario.get( 'enderecoTelefoneEmail' ).get( 'uf' ).value;
        this.dadosContato.endereco.indicativoEnderecoNacional = 'N';
        this.dadosContato.telefones = new Array();
        for ( const tel of this.formulario.get( 'enderecoTelefoneEmail' ).get( 'telefones' ).value ) {
          this.dadosContato.telefones.push( {
            codigoUsuarioResponsavel: tel.telefone.codigoUsuarioResponsavel,
            ddd: tel.telefone.ddd,
            ddi: tel.telefone.ddi,
            indicativoAutorizacaoComunicacao: tel.telefone.indicativoAutorizacaoComunicacao,
            numero: tel.telefone.numero,
            ramal: tel.telefone.ramal,
            sequencial: tel.telefone.sequencial,
            tipo: tel.telefone.tipo,
          } );
        }
        this.dadosContato.email = {
          codigoUsuarioResponsavel: '',
          email: this.formulario.get( 'enderecoTelefoneEmail' ).get( 'email' ).value,
          tipo: {
            codigo: 1,
            descricao: 'EMAIL',
          }
        };
        let temErro = false;
        if ( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaSms' ).value ) {
          let encontrouCelular = false;
          for ( const telefone of this.dadosContato.telefones ) {
            if ( telefone.tipo.codigo === 3 ) {
              encontrouCelular = true;
              telefone.indicativoAutorizacaoComunicacao = 1;
            } else {
              telefone.indicativoAutorizacaoComunicacao = 2;
            }
          }
          if ( !encontrouCelular ) {
            temErro = true;
            this.mensagemService.enviarAlerta( 'Para a preferência SMS, né necessário um número de celular.' );
          }
        }
        if ( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaCorreio' ).value ) {
          this.dadosContato.endereco.indicativoAutorizacaoComunicacao = 1;
        } else {
          this.dadosContato.endereco.indicativoAutorizacaoComunicacao = 2;
        }
        if ( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'preferenciaEmail' ).value ) {
          this.dadosContato.email.indicativoAutorizacaoComunicacao = 1;
        } else {
          this.dadosContato.email.indicativoAutorizacaoComunicacao = 2;
        }
        if ( !temErro ) {
          this.apoliceService.salvarContato( this.apolice.codigo, this.dadosContato ).subscribe( res => {
            console.log( res );
          });
        }
      } else {
        this.utilService.validateFormFields( this.formulario.get( 'enderecoTelefoneEmail' ) as FormGroup );
      }
      this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).enable();
    }
  }
  
  public removerAlterarDadosPessoaFisica() {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.apoliceService.removeMotivoEndosso( this.apolice.codigo, 1 ).subscribe( res => {
          this.motivosEndosso.push( this.motivosEndossoAdicionados.filter( (subject) => subject.codigo === 1 )[0] );
          if ( this.motivosEndossoAdicionados.length === 1 ) {
            this.motivosEndossoAdicionados.pop();
          } else {
            this.motivosEndossoAdicionados = this.motivosEndossoAdicionados.filter( (subject) => subject.codigo !== 1 );
          }
          this.mostrarAlterarDadosPessoaFisica = false;
          this.utilService.updateMaterializeTextFields();
        });
      }
     });
  }

  public removerAlterarEnderecoTelefoneEmail() {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        this.apoliceService.removeMotivoEndosso( this.apolice.codigo, 25 ).subscribe( res => {
          this.motivosEndosso.push( this.motivosEndossoAdicionados.filter( (subject) => subject.codigo === 25 )[0] );
          if ( this.motivosEndossoAdicionados.length === 25 ) {
            this.motivosEndossoAdicionados.pop();
          } else {
            this.motivosEndossoAdicionados = this.motivosEndossoAdicionados.filter( (subject) => subject.codigo !== 25 );
          }
          this.mostrarAlterarEnderecoTelefoneEmail = false;
          this.utilService.updateMaterializeTextFields();
        });
      }
     });
  }

  public removerTelefone( telefone: any ) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {
        ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).
        removeAt( ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).value.
        findIndex( subject => subject.telefone.tipo.codigo === telefone.tipo.codigo ) );
          }
     });
  }

  public editarTelefone( telefone: any ) {
    ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).
    removeAt( ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).value.
    findIndex( subject => subject.telefone.tipo.codigo === telefone.tipo.codigo ) );
    this.listaTipoTelefones.push( telefone.tipo );
    this.formulario.patchValue( {
      enderecoTelefoneEmail: {
        formTelefone: {
          tipoTelefone: telefone.tipo,
          ddi: telefone.ddi,
          ddd: telefone.ddd,
          numeroTelefone: telefone.numero,
        }
      }
    });
    this.utilService.updateMaterializeTextFields();
  }

  public pesquisarEndereco() {
    this.constantesService.findEnderecos( this.apolice.pessoa.cpf ).subscribe( res => {
      this.listaEnderecos = res[ 'data' ];
      if ( this.listaEnderecos.length > 0 ) {
        this.mostrarPesquisaEndereco = true;
      } else {
        this.mensagemService.enviarAlerta( 'Nenhum registro encontrado.' );
      }
    });
  }

  public pesquisarTelefones() {
    this.constantesService.findTelefones( this.apolice.pessoa.cpf ).subscribe( res => {
      this.listaTelefones = res[ 'data' ];
      if ( this.listaTelefones.length > 0 ) {
        this.mostrarPesquisaTelefone = true;
      } else {
        this.mensagemService.enviarAlerta( 'Nenhum registro encontrado.' );
      }
    });
  }

  public pesquisarEmails() {
    this.constantesService.findEmails( this.apolice.pessoa.cpf ).subscribe( res => {
      this.listaEmails = res[ 'data' ];
      if ( this.listaEmails.length > 0 ) {
        this.mostrarPesquisaEmail = true;
      } else {
        this.mensagemService.enviarAlerta( 'Nenhum registro encontrado.' );
      }
    });
  }

  public selecionandoEndereco( endereco: any ) {
    this.formulario.get( 'enderecoTelefoneEmail' ).patchValue( {
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: this.constantesService.getUnidadeFederacao( endereco.uf.sigla ),
    });
    this.utilService.updateMaterializeTextFields();
    this.mostrarPesquisaEndereco = false;
  }

  public selecionandoTelefone( telefone: any ) {
    if ( ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).value.
    findIndex( subject => subject.telefone.tipo.codigo === telefone.tipo.codigo ) > -1 ) {
      ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).
      removeAt( ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).controls[ 'telefones' ] ).value.
      findIndex( subject => subject.telefone.tipo.codigo === telefone.tipo.codigo ) );
    }
    ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).
    controls[ 'telefones' ] ).push( this.formBuilder.group( { telefone } ) );
    this.listaTipoTelefonesAdicionados.push(
      this.listaTipoTelefones.filter( (subject) => subject.codigo === telefone.tipo.codigo )[0] );
    this.listaTipoTelefones = this.listaTipoTelefones.filter( (subject) => subject.codigo !== telefone.tipo.codigo );
    this.mostrarPesquisaTelefone = false;
  }

  public selecionandoEmail( email: any ) {
    this.formulario.get( 'enderecoTelefoneEmail' ).patchValue( {
      email: email.email,
    });
    this.utilService.updateMaterializeTextFields();
    this.mostrarPesquisaEmail = false;
  }

  public incluirTelefone() {
    if ( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).valid ) {
      const telefone = {
        tipo: this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).get( 'tipoTelefone' ).value,
        ddi: this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).get( 'ddi' ).value,
        ddd: this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).get( 'ddd' ).value,
        numero: this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ).get( 'numeroTelefone' ).value,
      };
      ( <FormArray>( <FormGroup>this.formulario.get( 'enderecoTelefoneEmail' ) ).
      controls[ 'telefones' ] ).push( this.formBuilder.group( { telefone } ) );
      this.listaTipoTelefonesAdicionados.push(
        this.listaTipoTelefones.filter( (subject) => subject.codigo === telefone.tipo.codigo )[0] );
      this.listaTipoTelefones = this.listaTipoTelefones.filter( (subject) => subject.codigo !== telefone.tipo.codigo );
      this.limparTelefone();
    } else {
      this.utilService.validateFormFields( this.formulario.get( 'enderecoTelefoneEmail' ).get( 'formTelefone' ) as FormGroup );
    }
  }

  public fecharPesquisaEndereco() {
    this.mostrarPesquisaEndereco = false;
  }

  public fecharPesquisaTelefone() {
    this.mostrarPesquisaTelefone = false;
  }

  public fecharPesquisaEmail() {
    this.mostrarPesquisaEmail = false;
  }
}

