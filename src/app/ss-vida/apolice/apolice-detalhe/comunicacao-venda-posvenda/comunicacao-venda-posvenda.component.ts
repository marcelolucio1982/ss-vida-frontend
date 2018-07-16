import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApoliceService } from './../../service/apolice.service';
import { UtilService } from './../../../shared/services/util.service';
import { ConstantesService } from './../../../shared/services/constantes.service';

@Component({
  selector: 'app-comunicacao-venda-posvenda',
  templateUrl: './comunicacao-venda-posvenda.component.html',
  styleUrls: ['./comunicacao-venda-posvenda.component.scss']
})
export class ComunicacaoVendaPosVendaComponent implements OnInit {

  public detalhamentosVendaPosVenda: any = false;

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
        this.apoliceService.getDetalhamentoDevolucao(numeroApolice, endosso, parcela).subscribe( res => {
          this.detalhamentosVendaPosVenda = res['data'];
        });
      });
    });
  }

}
