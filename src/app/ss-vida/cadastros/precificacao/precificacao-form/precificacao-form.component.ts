import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { PrecificacaoService } from './../service/precificacao.service';
import { ConstantesService } from '../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-precificacao-form',
  templateUrl: './precificacao-form.component.html',
  styleUrls: ['./precificacao-form.component.scss']
})
export class PrecificacaoFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private precificacaoService: PrecificacaoService,
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
        this.precificacaoService.get({'sigla': sigla, 'versao': versao}).subscribe(res => {
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
      const precificacao: any = this.formulario.value;

      this.precificacaoService.persist(precificacao, aprovar, this.getEhNovaVersao()).subscribe(res => {
        this.mensagemService.enviarMensagem('Operação realizada com sucesso!');

        this.formulario.markAsPristine();
        this.pesquisar();
      });
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  pesquisar() {
    this.router.navigate(['/precificacao']);
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
    const precificacao = this.formulario.value;
    this.router.navigate(['/precificacao', precificacao.sigla, 'versoes', precificacao.versao, 'editar']);
  }

  excluir() {
    const precificacao = this.formulario.value;
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.precificacaoService.delete(precificacao).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
      }
    });
  }

  criarVersao() {
    const precificacao = this.formulario.value;
    this.router.navigate(['/precificacao', precificacao.sigla, 'versoes', precificacao.versao, 'novo']);
  }

  encerrar(efetivar = false) {
    const precificacao = this.formulario.value;

    if (efetivar) {
      this.mensagemService.limparMensagens();

      if (this.formulario.valid) {
        this.mensagemService.enviarMsgConfirm('Deseja encerrar o registro selecionado?').subscribe(confirmar => {
          if (confirmar) {
            this.precificacaoService.encerrar(precificacao).subscribe(res => {
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
      this.router.navigate(['/precificacao', precificacao.sigla, 'versoes', precificacao.versao, 'encerrar']);
    }
  }

  podeCriarVersao() {
    const precificacao = this.formulario.value;
    return precificacao.status && precificacao.status.codigo ? +precificacao.status.codigo > 1 : false;
  }

  podeEditar() {
    const precificacao = this.formulario.value;
    return precificacao.status && precificacao.status.codigo ? +precificacao.status.codigo < 2 : false;
  }

  podeExcluir() {
    return this.podeEditar();
  }

  podeEncerrar() {
    const precificacao = this.formulario.value;
    return precificacao.status && precificacao.status.codigo ? +precificacao.status.codigo === 3 : false;
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate($event = null): any {
    return this.formulario.dirty ? ($event ? false :
      this.mensagemService.enviarMsgConfirm('Você perderá os dados informados. Deseja sair sem salvar?').first()) : true;
  }

}
