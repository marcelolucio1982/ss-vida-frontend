import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarResumoService } from './service/configurar-resumo.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-resumo',
  templateUrl: './configurar-resumo.component.html',
  styleUrls: ['./configurar-resumo.component.scss']
})
export class ConfigurarResumoComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarResumoService: ConfigurarResumoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoResumo: ['XXX', Validators.required],
      nomeResumo: ['Lorem ipsulum', Validators.required],
      processoSusepResumo: ['XXX', Validators.required],
      versaoResumo: ['2', Validators.required],
      situacaoResumo: ['Pendente', Validators.required],
      inicioComercializacaoResumo: ['15/05/2017', Validators.required],
      parceiroResumo: [null, Validators.required],
      tipoLocalVendaResumo: [null, Validators.required],
      corretorApoliceResumo: [null, Validators.required],
      corretorResumo: [null, Validators.required],
      balcaoResumo: [null, Validators.required],
      aQuemPagarResumo: [null, Validators.required],
      unidadeReferenciaResumo: [null, Validators.required],
      parametrosResumo: [null, Validators.required],
      minimoParametrosResumo: [null, Validators.required],
      maximoParametrosResumo: [null, Validators.required],
      formaPagamentoResumo: [null, Validators.required],
      criterioResumo: [null, Validators.required],
      numeroParcelaResumo: [null, Validators.required],
      referenciaValorResumo: [null, Validators.required]

    });
  }

  onSubmit() { }

}
