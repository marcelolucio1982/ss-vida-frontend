import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PrecificacaoService } from './service/precificacao.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-precificacao',
  templateUrl: './precificacao.component.html',
  styleUrls: ['./precificacao.component.scss']
})
export class PrecificacaoComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private precificacaoService: PrecificacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoprecificacao: ['XXX', Validators.required],
      nomePrecificacao: ['nome de teste', Validators.required],
      processoSusepPrecificacao: ['XXX', Validators.required],
      versaoPrecificacao: ['2', Validators.required],
      situacaoPrecificacao: ['aprovado', Validators.required],
      inicioComercializacaoPrecificacao: ['12/07/2017', Validators.required],
      parceiroPrecificacao: [null, Validators.required],
      tipoLocalVendaPrecificacao: [null, Validators.required],
      carregamentoPrecificacao: [null, Validators.required],
      indicadorDataDiagnostico: [null, Validators.required],
      unidadeReferenciaPrecificacaoPercentual: [null, Validators.required],
      unidadeReferenciaPrecificacaoValorRs: [null, Validators.required],
      valorMensalPrecificacao: [null, Validators.required],
      anualUnicoPrecificacao: [null, Validators.required],
      despesaPrecificacao: [null, Validators.required],
      unidadeReferenciaDespesaPercentual: [null, Validators.required],
      unidadeReferenciaDespesaValorRs: [null, Validators.required]
    });
  }

  onSubmit() { }

}
