import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from './../../../shared/services/util.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { ApoliceService } from './../../service/apolice.service';

@Component({
  selector: 'app-detalhe-cobranca',
  templateUrl: './detalhe-cobranca.component.html',
  styleUrls: ['./detalhe-cobranca.component.scss']
})
export class DetalheCobrancaComponent implements OnInit {

  public dadosParcelaCobranca: any = false;
  public detalhamentosCobranca: any = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private apoliceService: ApoliceService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      const numeroApolice = params.id;
      this.route.params.subscribe(params2 => {
        const endosso = params2.endosso;
        const parcela = params2.parcela;

        this.apoliceService.getDadosParcelaCobranca(numeroApolice, endosso, parcela).subscribe( res => {
          this.dadosParcelaCobranca = res['data'];
          this.apoliceService.getDetalhamentoCobranca(numeroApolice, endosso, parcela).subscribe( res2 => {
            this.detalhamentosCobranca = res2['data'];
          });
        });

      });
    });
  }

}
