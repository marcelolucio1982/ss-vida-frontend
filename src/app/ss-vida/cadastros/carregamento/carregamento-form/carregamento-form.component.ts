import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import { CarregamentoService } from './../service/carregamento.service';
import { ConstantesService } from '../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-carregamento-form',
  templateUrl: './carregamento-form.component.html',
  styleUrls: ['./carregamento-form.component.scss']
})
export class CarregamentoFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private carregamentoService: CarregamentoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public constantesService: ConstantesService,
    private mensagemService: MensagemService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.configurarFormulario({'dataAtualizacao': '', 'dataFimVigencia': '', 'versao': ''});

    this.pathSub = this.route.params.subscribe(params => {
      const sigla = params['sigla'];
      const versao = +params['versao'];

      if (sigla && versao) {
        this.carregamentoService.get({'sigla': sigla, 'versao': versao}).subscribe(res => {
          this.configurarFormulario(res);
        });
      }
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  private configurarFormulario(obj) {
    if (this.formulario) {
      this.formulario.patchValue({
        sigla: obj.sigla,
        descricao: obj.descricao,
        dataInicioVigencia: obj.dataInicioVigencia,
        dataFimVigencia: obj.dataFimVigencia,
        status: obj.status,
        dataAtualizacao: obj.dataAtualizacao,
        dataInclusao: obj.dataInclusao,
        usuarioInclusao: obj.usuarioInclusao,
        versao: obj.versao,
        totalVersoes: obj.totalVersoes
      });
    } else {
      this.formulario = this.formBuilder.group({
        sigla: [obj.sigla, Validators.required],
        descricao: [obj.descricao, Validators.required],
        dataInicioVigencia: [obj.dataInicioVigencia, Validators.required],
        dataFimVigencia: [obj.dataFimVigencia, (this.getEhEncerramento() ? Validators.required : null)],
        status: [obj.status, null],
        dataAtualizacao: [obj.dataAtualizacao, null],
        dataInclusao: [obj.dataInclusao, null],
        usuarioInclusao: [obj.usuarioInclusao, null],
        versao: [obj.versao, null],
        totalVersoes: [obj.totalVersoes, null]
      });

      this.utilService.configurarInputData(this.formulario, 'dataInicioVigencia');
      this.utilService.configurarInputData(this.formulario, 'dataFimVigencia');
    }

    this.utilService.updateMaterializeTextFields();
  }

  salvar(aprovar = false) {
    this.mensagemService.limparMensagens();

    if (this.formulario.valid) {
      const carregamento: any = this.formulario.value;

      this.carregamentoService.persist(carregamento, aprovar, this.getEhNovaVersao()).subscribe(res => {
        this.mensagemService.enviarMensagem('Operação realizada com sucesso!');

        this.formulario.markAsPristine();
        this.pesquisar();
      });
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  pesquisar() {
    this.router.navigate(['/carregamento']);
  }

  getEhNovaVersao() {
    return this.route.routeConfig.path === ':sigla/versoes/:versao/novo';
  }

  getEhVisualizacao() {
    return this.route.routeConfig.path === ':sigla/versoes/:versao';
  }

  getEhEncerramento() {
    return this.route.routeConfig.path === ':sigla/versoes/:versao/encerrar';
  }

  getEhPrimeiraVersao() {
    return this.formulario.value.totalVersoes < 2;
  }

  editar() {
    const carregamento = this.formulario.value;
    this.router.navigate(['/carregamento', carregamento.sigla, 'versoes', carregamento.versao, 'editar']);
  }

  excluir() {
    const carregamento = this.formulario.value;
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.carregamentoService.delete(carregamento).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
      }
    });
  }

  criarVersao() {
    const carregamento = this.formulario.value;
    this.router.navigate(['/carregamento', carregamento.sigla, 'versoes', carregamento.versao, 'novo']);
  }

  encerrar(efetivar = false) {
    const carregamento = this.formulario.value;

    if (efetivar) {
      this.mensagemService.limparMensagens();

      if (this.formulario.valid) {
        this.mensagemService.enviarMsgConfirm('Deseja encerrar o registro selecionado?').subscribe(confirmar => {
          if (confirmar) {
            this.carregamentoService.encerrar(carregamento).subscribe(res => {
              this.formulario.markAsPristine();
              this.pesquisar();
              this.mensagemService.enviarMensagem('Registro encerrado com sucesso!');
            });
          }
        });
      } else {
        this.utilService.validateAllFormFields(this.formulario);
      }
    } else {
      this.router.navigate(['/carregamento', carregamento.sigla, 'versoes', carregamento.versao, 'encerrar']);
    }
  }

  podeCriarVersao() {
    const carregamento = this.formulario.value;
    return carregamento.status && carregamento.status.codigo ? +carregamento.status.codigo > 1 : false;
  }

  podeEditar() {
    const carregamento = this.formulario.value;
    return carregamento.status && carregamento.status.codigo ? +carregamento.status.codigo < 2 : false;
  }

  podeExcluir() {
    return this.podeEditar();
  }

  podeEncerrar() {
    const carregamento = this.formulario.value;
    return carregamento.status && carregamento.status.codigo ? +carregamento.status.codigo === 3 : false;
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
