import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from '../../../shared/services/util.service';
import { AgrupadorParceiroService } from '../service/agrupador-parceiro.service';

@Component({
  selector: 'app-agrupador-parceiro-detalhe',
  templateUrl: './agrupador-parceiro-detalhe.component.html',
  styleUrls: ['./agrupador-parceiro-detalhe.component.css']
})
export class AgrupadorParceiroDetalheComponent implements OnInit, OnDestroy {

  public agrupadorParceiro: any;

  private pathSub: any;

  constructor(
    private router: Router,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private agrupadorParceiroService: AgrupadorParceiroService) { }

  ngOnInit() {
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
          this.agrupadorParceiro = res;
        });
      }
    });
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  voltar() {
    this.router.navigate( [ '/agrupador-parceiro' ] );
  }

}
