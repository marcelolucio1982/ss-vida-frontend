import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AgrupadorParceiroService } from './../service/agrupador-parceiro.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-agrupador-parceiro-form',
  templateUrl: './agrupador-parceiro-form.component.html',
  styleUrls: ['./agrupador-parceiro-form.component.css']
})
export class AgrupadorParceiroFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agrupadorParceiroService: AgrupadorParceiroService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigo: [null],
      descricao: [null, Validators.required],
      dataInicioVigencia: [null, Validators.required],
      dataFimVigencia: [null, this.isEncerrar() ? Validators.required : null],
      dataHoraAtualizacao: [null],
      situacao: [ { value: null, disabled: true } ]
    });

    this.pathSub = this.route.params.subscribe( params => {
      const codigo = +params[ 'id' ];
      const dataInicioVigencia = params[ 'dataInicioVigencia' ];
      const dataHoraAtualizacao = params[ 'dataHoraAtualizacao' ];

      if ( codigo && dataInicioVigencia && dataHoraAtualizacao ) {
        this.agrupadorParceiroService.get( {
          'codigo': codigo,
          'dataInicioVigencia': dataInicioVigencia,
          'dataHoraAtualizacao': dataHoraAtualizacao
        } ).subscribe( res => {
          this.preencherFormulario( res );
        });
      }
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  private preencherFormulario( agrupadorParceiro ) {

    this.formulario.patchValue( {
        codigo: agrupadorParceiro.codigo,
        descricao: agrupadorParceiro.descricao,
        dataInicioVigencia: this.utilService.formatarDataVisao( agrupadorParceiro.dataInicioVigencia ),
        dataFimVigencia: agrupadorParceiro.dataFimVigencia,
        dataHoraAtualizacao: agrupadorParceiro.dataHoraAtualizacao,
        situacao: agrupadorParceiro.situacao.descricao
      } );

      this.utilService.updateMaterializeTextFields();

  }

  criar() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const agrupadorParceiro: any = this.formulario.value;
      agrupadorParceiro.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorParceiro.dataInicioVigencia );
      this.agrupadorParceiroService.criar( agrupadorParceiro ).subscribe( res => {
        if ( res[ 'codigo' ] != null ) {
          this.voltar();
          this.mensagemService.enviarMensagem( 'Cadastro de Empresa de Assistência realizado com sucesso!' );
        }
      });
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  salvar() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const agrupadorParceiro: any = this.formulario.value;
      agrupadorParceiro.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorParceiro.dataInicioVigencia );
      this.agrupadorParceiroService.salvar( agrupadorParceiro ).subscribe( res => {
        this.voltar();
        this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
      });
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  aprovar() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const agrupadorParceiro: any = this.formulario.value;
      agrupadorParceiro.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorParceiro.dataInicioVigencia );
      this.agrupadorParceiroService.aprovar( agrupadorParceiro ).subscribe( res => {
        this.voltar();
        this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
      });
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  encerrar() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const agrupadorParceiro: any = this.formulario.value;
      agrupadorParceiro.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorParceiro.dataInicioVigencia );
      agrupadorParceiro.dataFimVigencia = this.utilService.formatarDataModelo( agrupadorParceiro.dataFimVigencia );
      this.agrupadorParceiroService.salvar( agrupadorParceiro ).subscribe( res => {
        this.voltar();
        this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
      });
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  isNovo() {
    return this.route.routeConfig.path === 'novo';
  }

  isEdicao() {
    return this.route.routeConfig.path === ':id/:dataInicioVigencia/:dataHoraAtualizacao/editar';
  }

  isEncerrar() {
    return this.route.routeConfig.path === ':id/:dataInicioVigencia/:dataHoraAtualizacao/encerrar';
  }

  voltar() {
    this.router.navigate( [ '/agrupador-parceiro' ] );
  }
}
