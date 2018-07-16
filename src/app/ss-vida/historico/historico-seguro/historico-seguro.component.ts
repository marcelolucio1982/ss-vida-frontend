import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaService } from './../../proposta/service/proposta.service';
import { UtilService } from './../../shared/services/util.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-historico-seguro',
  templateUrl: './historico-seguro.component.html',
  styleUrls: ['./historico-seguro.component.scss']
})
export class HistoricoSeguroComponent implements OnInit, OnDestroy {

  public formulario: FormGroup;
  public historicoSeguroList: any = [];
  private pathSub: any;
  private voltarUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private propostaService: PropostaService,
  ) { }

  ngOnInit() {

    this.pathSub = this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      this.propostaService.get( codigo ).subscribe( res => {
        const proposta: any = res;
        this.propostaService.listarHistoricoSeguro(proposta.numeroProposta, proposta.versao).subscribe( res2 => {
          this.historicoSeguroList = res2;
        });
      });
    });

    this.voltarUrl = this.route.snapshot.queryParamMap.get( 'voltar' );

  }

  voltar() {
    this.router.navigate( [ this.voltarUrl ] );
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

}
