import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AgrupadorLocalVendaService } from './../service/agrupador-local-venda.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-agrupador-local-venda-form',
  templateUrl: './agrupador-local-venda-form.component.html',
  styleUrls: ['./agrupador-local-venda-form.component.css']
})

export class AgrupadorLocalVendaFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agrupadorLocalVendaService: AgrupadorLocalVendaService,
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
      dataHoraCadastramento: [null],
      situacao: [ { value: null, disabled: true } ]
    });

    this.pathSub = this.route.params.subscribe( params => {
      const codigo = +params[ 'id' ];
      const dataInicioVigencia = params[ 'dataInicioVigencia' ];
      const dataHoraCadastramento = params[ 'dataHoraCadastramento' ];

      if ( codigo && dataInicioVigencia && dataHoraCadastramento ) {
        this.agrupadorLocalVendaService.get( {
          'codigo': codigo,
          'dataInicioVigencia': dataInicioVigencia,
          'dataHoraCadastramento': dataHoraCadastramento
        } ).subscribe( res => {
          this.preencherFormulario( res );
        });
      }
    });
  }

  private preencherFormulario( agrupadorLocalVenda ) {

    this.formulario.patchValue( {
        codigo: agrupadorLocalVenda.codigo,
        descricao: agrupadorLocalVenda.descricao,
        dataInicioVigencia: this.utilService.formatarDataVisao( agrupadorLocalVenda.dataInicioVigencia ),
        dataFimVigencia: agrupadorLocalVenda.dataFimVigencia,
        dataHoraCadastramento: agrupadorLocalVenda.dataHoraCadastramento,
        situacao: agrupadorLocalVenda.situacao.descricao
      } );

      this.utilService.updateMaterializeTextFields();

  }

  criar() {
    this.mensagemService.limparMensagens();
    if ( this.formulario.valid ) {
      const agrupadorLocalVenda: any = this.formulario.value;
      agrupadorLocalVenda.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorLocalVenda.dataInicioVigencia );
      this.agrupadorLocalVendaService.criar( agrupadorLocalVenda ).subscribe( res => {
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
      const agrupadorLocalVenda: any = this.formulario.value;
      agrupadorLocalVenda.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorLocalVenda.dataInicioVigencia );
      this.agrupadorLocalVendaService.salvar( agrupadorLocalVenda ).subscribe( res => {
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
      const agrupadorLocalVenda: any = this.formulario.value;
      agrupadorLocalVenda.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorLocalVenda.dataInicioVigencia );
      this.agrupadorLocalVendaService.aprovar( agrupadorLocalVenda ).subscribe( res => {
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
      const agrupadorLocalVenda: any = this.formulario.value;
      agrupadorLocalVenda.dataInicioVigencia = this.utilService.formatarDataModelo( agrupadorLocalVenda.dataInicioVigencia );
      agrupadorLocalVenda.dataFimVigencia = this.utilService.formatarDataModelo( agrupadorLocalVenda.dataFimVigencia );
      this.agrupadorLocalVendaService.salvar( agrupadorLocalVenda ).subscribe( res => {
        this.voltar();
        this.mensagemService.enviarMensagem( res[ 'mensagem' ] );
      });
    } else {
      this.utilService.validateAllFormFields( this.formulario );
    }
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  isNovo() {
    return this.route.routeConfig.path === 'novo';
  }

  isEdicao() {
    return this.route.routeConfig.path === ':id/:dataInicioVigencia/:dataHoraCadastramento/editar';
  }

  isEncerrar() {
    return this.route.routeConfig.path === ':id/:dataInicioVigencia/:dataHoraCadastramento/encerrar';
  }

  voltar() {
    this.router.navigate( [ '/agrupador-local-venda' ] );
  }
}
