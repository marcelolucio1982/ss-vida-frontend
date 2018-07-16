import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroProdutoService } from '../servico/cadastro-produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MensagemService } from '../../../shared/services/mensagem.service';
import { UtilService } from '../../../shared/services/util.service';
import { ConstantesService } from '../../../shared/services/constantes.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-cadastro-produto-form',
  templateUrl: './cadastro-produto-form.component.html',
  styleUrls: ['./cadastro-produto-form.component.scss']
})
export class CadastroProdutoFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;
  retorno: any = false;

  constructor(
    private cadastroProdutoService: CadastroProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {

    this.configurarFormulario({'dataAtualizacao': '', 'dataFimVigencia': '', 'versao': ''});

    this.pathSub = this.route.params.subscribe(params => {
      const codigo = params['codigo'];

      if (codigo) {
        this.cadastroProdutoService.get({'codigo': codigo}).subscribe(res => {
          this.configurarFormulario(res);

          if (this.getEhVisualizacao()) {
            this.cadastroProdutoService.history(res).subscribe(
              ret => this.retorno = ret['data']
            );
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  private configurarFormulario(obj) {
    if (this.formulario) {
      const grupoSusep = this.utilService.getCorrespondentePor(this.constantesService.getGruposSusep(), obj.grupoSusep);
      this.formulario.patchValue({
        codigo: obj.codigo,
        descricao: obj.descricao,
        unidadeNegocio: this.utilService.getCorrespondentePor(this.constantesService.getUnidadesNegocio(), obj.unidadeNegocio),
        dataInicioVigencia: obj.dataInicioVigencia,
        observacoes: obj.observacoes,
        codigoProcessoSusep: obj.codigoProcessoSusep,
        grupoSusep: grupoSusep,
        ramoSusep: this.utilService.getCorrespondentePor(this.constantesService.getRamosSusep(grupoSusep.codigo), obj.ramoSusep),
        dataAtualizacao: obj.dataAtualizacao,
        status: obj.status
      });
    } else {
      this.formulario = this.formBuilder.group({
        codigo: [null, Validators.required],
        descricao: [null, Validators.required],
        unidadeNegocio: [null, Validators.required],
        dataInicioVigencia: [null, Validators.required],
        observacoes: [null, null],
        codigoProcessoSusep: [null, Validators.required],
        grupoSusep: [null, Validators.required],
        ramoSusep: [null, Validators.required],
        dataAtualizacao: [null, null],
        status: [null, null]
      });

      this.utilService.configurarInputData(this.formulario, 'dataInicioVigencia');

      this.formulario.controls.ramoSusep.valueChanges.subscribe(data => {
        setTimeout(this.utilService.updateMaterializeTextFields());
      });
    }

    this.utilService.updateMaterializeTextFields();
  }

  salvar(aprovar = false) {
    this.mensagemService.limparMensagens();

    if (this.formulario.valid) {
      const produto: any = this.formulario.value;

      this.cadastroProdutoService.persist(produto, aprovar).subscribe(res => {
        this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
          this.formulario.markAsPristine();
          this.pesquisar();
      });
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  pesquisar() {
    this.router.navigate(['/cadastro-produto/visualizar']);
  }

  editar(e: any) {
    this.router.navigate(['/cadastro-produto', this.formulario.value.codigo, 'editar']);
  }

  excluir() {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.cadastroProdutoService.delete(this.formulario.value).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Produto excluído com sucesso!');
        });
      }
    });
  }

  podeEditar() {
    return this.formulario.value.status < 2;
  }

  podeExcluir(e: any) {
    return this.podeEditar();
  }

  getEhVisualizacao() {
    return this.route.routeConfig.path === ':codigo';
  }

  visualizar(e: any) {
    alert('Observações: ' + e.produto.observacoes);
  }

}
