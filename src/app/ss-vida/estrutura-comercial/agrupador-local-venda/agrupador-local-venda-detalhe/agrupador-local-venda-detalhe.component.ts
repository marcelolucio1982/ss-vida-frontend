import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from '../../../shared/services/util.service';
import { AgrupadorLocalVendaService } from '../service/agrupador-local-venda.service';

@Component({
  selector: 'app-agrupador-local-venda-detalhe',
  templateUrl: './agrupador-local-venda-detalhe.component.html',
  styleUrls: ['./agrupador-local-venda-detalhe.component.css']
})
export class AgrupadorLocalVendaDetalheComponent implements OnInit, OnDestroy {

  public agrupadorLocalVenda: any;

  private pathSub: any;

  constructor(
    private router: Router,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private agrupadorLocalVendaService: AgrupadorLocalVendaService
  ) { }

  ngOnInit() {
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
          this.agrupadorLocalVenda = res;
        });
      }
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  voltar() {
    this.router.navigate( [ '/agrupador-local-venda' ] );
  }
}
