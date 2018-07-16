import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CarregamentoService } from './service/carregamento.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-carregamento',
  templateUrl: './carregamento.component.html',
  styleUrls: ['./carregamento.component.scss']
})
export class CarregamentoComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private carregamentoService: CarregamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    private utilService: UtilService,
    public constantesService: ConstantesService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      status: [null, Validators.required]
    });
    if ( this.utilService.getFiltroPesquisa( this.router.url ) &&
         this.utilService.getFiltroPesquisa( this.router.url ) !== null ) {
      this.formulario.setValue( this.utilService.getFiltroPesquisa( this.router.url ) );
      this.pesquisar();
    }
  }

  onSubmit() { }

  pesquisar() {
    this.mensagemService.limparMensagens();
    const filtro: any = this.formulario.value;

    this.carregamentoService.list(filtro).subscribe(
      res => {
        this.retorno = res;
        if (!this.retorno || this.retorno.length === 0) {
          this.mensagemService.enviarErro('Não existe carregamento conforme informação inserida(s) no(s) campo(s).');
        } else {
          this.utilService.setFiltroPesquisa( this.router.url, this.formulario.value );
        }
      }
    );
  }

  cadastrar() {
    this.router.navigate(['/carregamento/novo']);
  }

  criarVersao(e: any) {
    this.router.navigate(['/carregamento', e.sigla, 'versoes', e.versao, 'novo']);
  }

  editar(e: any) {
    this.router.navigate(['/carregamento', e.sigla, 'versoes', e.versao, 'editar']);
  }

  visualizar(e: any) {
    this.router.navigate(['/carregamento', e.sigla, 'versoes', e.versao]);
  }

  encerrar(e: any) {
    this.router.navigate(['/carregamento', e.sigla, 'versoes', e.versao, 'encerrar']);
  }

  excluir(e: any) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.carregamentoService.delete(e).subscribe(res => {
          this.pesquisar();
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
      }
    });
  }

  podeCriarVersao(e: any) {
    return +e.status.codigo > 1;
  }

  podeEditar(e: any) {
    return +e.status.codigo < 2;
  }

  podeExcluir(e: any) {
    return this.podeEditar(e);
  }

  podeEncerrar(e: any) {
    return +e.status.codigo === 3;
  }

}
