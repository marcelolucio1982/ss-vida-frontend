import { ApoliceService } from './../../service/apolice.service';
import { UtilService } from './../../../shared/services/util.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobranca-devolucao',
  templateUrl: './cobranca-devolucao.component.html',
  styleUrls: ['./cobranca-devolucao.component.scss']
})
export class CobrancaDevolucaoComponent implements OnInit {

  public cobrancas: any = false;
  public devolucoes: any = false;

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
      this.apoliceService.getCobrancas(numeroApolice).subscribe( res => {
        this.cobrancas = res['data'];
      });

      this.apoliceService.getDevolucoes(numeroApolice).subscribe( res => {
        this.devolucoes = res['data'];
      });
    });
  }

}
