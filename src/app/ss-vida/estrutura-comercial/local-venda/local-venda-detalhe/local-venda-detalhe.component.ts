import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from '../../../shared/services/util.service';
import { LocalVendaService } from './../service/local-venda.service';

@Component({
  selector: 'app-local-venda-detalhe',
  templateUrl: './local-venda-detalhe.component.html',
  styleUrls: ['./local-venda-detalhe.component.css']
})
export class LocalVendaDetalheComponent implements OnInit, OnDestroy {

  public localVenda: any;

  private pathSub: any;

  constructor(
    private router: Router,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private localVendaService: LocalVendaService
  ) { }

  ngOnInit() {
    this.pathSub = this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      const dataHoraCadastramento = params[ 'dataHoraCadastramento' ];
      this.localVendaService.get( codigo, dataHoraCadastramento ).subscribe( res => {
        this.localVenda = res;
      });
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  voltar() {
    this.router.navigate( [ '/local-venda' ] );
  }
}
