import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';
import { PropostaService } from '../../proposta/service/proposta.service';

@Component({
  selector: 'app-historico-header',
  templateUrl: './historico-header.component.html',
  styleUrls: ['./historico-header.component.scss']
})
export class HistoricoHeaderComponent implements OnInit {

  public title: String;
  public proposta: any;

  constructor(
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private propostaService: PropostaService,
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.queryParamMap.get( 'title' );
    this.route.params.subscribe( params => {
      const numeroProposta = params[ 'id' ];
      this.propostaService.get( numeroProposta ).subscribe( res => {
        this.proposta = res;
      });
    });
  }

}
