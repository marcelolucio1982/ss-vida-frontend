import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProdutoService } from '../servico/cadastro-produto.service';
import { MensagemService } from '../../../shared/services/mensagem.service';
import { ConstantesService } from '../../../shared/services/constantes.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-cadastro-produto-detalhe',
  templateUrl: './cadastro-produto-detalhe.component.html',
  styleUrls: ['./cadastro-produto-detalhe.component.scss']
})
export class CadastroProdutoDetalheComponent implements OnInit {

  formulario: FormGroup;
  retorno: any = false;

  constructor(
    private cadastroProdutoService: CadastroProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoProduto: [{value: null, disabled: false}, null],
      grupoSusep: [{value: null, disabled: false}, null],
      nomeProduto: [{value: null, disabled: false}, null],
      processoSusep: [{value: null, disabled: false}, null],
      ramoSusep: [{value: null, disabled: false}, null],
      tipoPesquisa: [{value: null, disabled: false}, null]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  pesquisar( filtro: any = null ) {
    this.mensagemService.limparMensagens();

    filtro = this.formulario.value;

    if ( !filtro.tipoPesquisa
      || (filtro.tipoPesquisa === 'codigo' && !filtro.codigoProduto)
      || (filtro.tipoPesquisa === 'nome' && !filtro.nomeProduto)
      || (filtro.tipoPesquisa === 'ramoSusep' && (!filtro.grupoSusep || !filtro.ramoSusep))
      || (filtro.tipoPesquisa === 'processoSusep' && !filtro.processoSusep)
     ) {
      this.mensagemService.enviarErro('Ao menos um dos campos da interface de pesquisa deve ser preenchido.');
      return;
    }

    this.cadastroProdutoService.list(filtro).subscribe(
      res => {
        this.retorno = res['data'];
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe produto conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

  excluir(e: any) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.cadastroProdutoService.delete(e).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Produto excluído com sucesso!');
        });
      }
    });
  }

  cadastrar() {
    this.router.navigate(['/cadastro-produto/novo']);
  }

  visualizar(e: any) {
    this.router.navigate(['/cadastro-produto', e.codigo ]);
  }

  editar(e: any) {
    this.router.navigate(['/cadastro-produto', e.codigo, 'editar']);
  }

  podeEditar(e: any) {
    return +e.status < 2;
  }

  podeExcluir(e: any) {
    return this.podeEditar(e);
  }

}
