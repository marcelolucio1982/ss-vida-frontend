import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';
import { PropostaService } from '../../proposta/service/proposta.service';

@Component({
  selector: 'app-produtos-segurado',
  templateUrl: './produtos-segurado.component.html',
  styleUrls: ['./produtos-segurado.component.scss']
})
export class ProdutosSeguradoComponent implements OnInit {

  private voltarUrl: String;
  public produtosList: Array<any> = new Array();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private propostaService: PropostaService,
  ) { }

  ngOnInit() {
    this.voltarUrl = this.route.snapshot.queryParamMap.get( 'voltar' );
    this.route.params.subscribe( params => {
      const cpf = params[ 'cpf' ];
      this.propostaService.listar( { 'cpf': cpf, 'historico': true } ).subscribe( res => {
        this.produtosList = res;
      });
    });
  }

  voltar() {
    this.router.navigate( [ this.voltarUrl ] );
  }
}
