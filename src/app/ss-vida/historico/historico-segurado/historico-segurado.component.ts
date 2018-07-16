import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';
import { PropostaService } from '../../proposta/service/proposta.service';

@Component({
  selector: 'app-historico-segurado',
  templateUrl: './historico-segurado.component.html',
  styleUrls: ['./historico-segurado.component.scss']
})
export class HistoricoSeguradoComponent implements OnInit {

  private voltarUrl: String;
  public proposta: any;
  public pepList: Array<any> = new Array();
  public nList: Array<any> = new Array();

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
      const numeroProposta = params[ 'id' ];
      this.propostaService.get( numeroProposta ).subscribe( res => {
        this.proposta = res;
        this.constantesService.findPep( this.proposta.pessoa.cpfCnpj ).subscribe( res2 => {
          this.pepList = res2;
        });
        this.constantesService.findNlist( this.proposta.pessoa.cpfCnpj ).subscribe( res2 => {
          this.nList = res2;
        });
      });
    });
  }

  voltar() {
    this.router.navigate( [ this.voltarUrl ] );
  }
}
