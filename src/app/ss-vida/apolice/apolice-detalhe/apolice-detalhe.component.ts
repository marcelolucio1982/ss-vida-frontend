import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from '../../shared/services/mensagem.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { UtilService } from '../../shared/services/util.service';
import { ApoliceService } from '../service/apolice.service';

@Component({
  selector: 'app-apolice-detalhe',
  templateUrl: './apolice-detalhe.component.html',
  styleUrls: ['./apolice-detalhe.component.css']
})
export class ApoliceDetalheComponent implements OnInit {

  public apolice: any;

  public beneficiarios: any = false;
  public coberturas: any = false;
  public assistencias: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private apoliceService: ApoliceService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => {
      const codigo = params[ 'id' ];
      this.apoliceService.get( codigo ).subscribe( res => {
        this.apolice = res;
      });
    });
  }

  voltar() {
    this.router.navigate( [ '/apolice' ] );
  }

  historicoSeguro() {
    this.router.navigate( [ `/historico/historico-seguro/${this.apolice.endosso.proposta.numeroPropostaExterna}` ],
                          { queryParams: { title: 'Histórico do Seguro', voltar: `/apolice/${this.apolice.codigo}/dados-apolice` }} );
  }

  historicoSegurado() {
    this.router.navigate( [ `/historico/historico-segurado/${this.apolice.endosso.proposta.numeroPropostaExterna}` ],
                          { queryParams: { title: 'Histórico do Segurado', voltar: `/apolice/${this.apolice.codigo}/dados-apolice` }} );
  }

  produtosSegurado() {
    this.router.navigate( [ `/historico/produtos-segurado/` +
                            `${this.apolice.endosso.proposta.numeroPropostaExterna}/` +
                            `${this.apolice.pessoa.cpf}` ],
                          { queryParams: { title: 'Produtos do Segurado', voltar: `/apolice/${this.apolice.codigo}/dados-apolice` }} );
  }

}
