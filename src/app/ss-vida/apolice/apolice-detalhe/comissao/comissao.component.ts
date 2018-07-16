import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilService } from './../../../shared/services/util.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { ApoliceService } from './../../service/apolice.service';

@Component({
  selector: 'app-comissao',
  templateUrl: './comissao.component.html',
  styleUrls: ['./comissao.component.scss']
})
export class ComissaoComponent implements OnInit {

  public cadeiaComissionado: any = false;
  public comissoesCalculadas: any = false;

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
        this.apoliceService.getComissaoCadeiaComissionado(numeroApolice).subscribe( res => {
          this.cadeiaComissionado = res['data'];
          this.apoliceService.getComissaoCalculada(numeroApolice).subscribe( res2 => {
            this.comissoesCalculadas = res2['data'];
        });
      });
    });
  }

}
