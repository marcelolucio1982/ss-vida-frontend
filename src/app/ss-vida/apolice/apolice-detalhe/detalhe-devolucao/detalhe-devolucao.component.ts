import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApoliceService } from './../../service/apolice.service';
import { UtilService } from './../../../shared/services/util.service';
import { ConstantesService } from './../../../shared/services/constantes.service';

@Component({
  selector: 'app-detalhe-devolucao',
  templateUrl: './detalhe-devolucao.component.html',
  styleUrls: ['./detalhe-devolucao.component.scss']
})
export class DetalheDevolucaoComponent implements OnInit {

  public detalhamentosDevolucao: any = false;

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
          this.detalhamentosDevolucao = res['data'];
        });
      });
    });
  }

}
