import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CoberturaService } from './../service/cobertura.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';

@Component({
  selector: 'app-cobertura-detalhe',
  templateUrl: './cobertura-detalhe.component.html',
  styleUrls: ['./cobertura-detalhe.component.css']
})
export class CoberturaDetalheComponent implements OnInit, OnDestroy {

  private pathSub: any;
  retorno: any = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coberturaService: CoberturaService,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
   ) { }

  ngOnInit() {
    this.pathSub = this.route.params.subscribe(params => {
      const idCobertura = +params['id'];
      this.carregarVersoes(idCobertura);
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  private carregarVersoes(idCobertura) {
    this.coberturaService.getVersoes({'codigo': idCobertura}).subscribe(res => {
      this.retorno = res;
      if (!res || res.length === 0) {
        this.pesquisar();
      }
    });
  }

  pesquisar() {
    this.router.navigate(['/cobertura']);
  }

  editar(cobertura) {
    this.router.navigate(['/cobertura', cobertura.codigo, 'versoes', cobertura.versao]);
  }

  gerarVersao(cobertura) {
    this.router.navigate(['/cobertura', cobertura.codigo, 'versoes', cobertura.versao, 'novo']);
  }

  deletar(cobertura) {
    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe(confirmar => {
      if (confirmar) {
        this.coberturaService.delete({'codigo': cobertura.codigo, 'versao': cobertura.versao}).subscribe(res => {
          this.carregarVersoes(cobertura.codigo);
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
        });
      }
    });
  }

}
