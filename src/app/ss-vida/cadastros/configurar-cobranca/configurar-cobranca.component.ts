import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarCobrancaService } from './service/configurar-cobranca.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-cobranca',
  templateUrl: './configurar-cobranca.component.html',
  styleUrls: ['./configurar-cobranca.component.scss']
})
export class ConfigurarCobrancaComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarCobrancaService: ConfigurarCobrancaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoCobranca: ['XXX', Validators.required],
      nomeCobranca: ['lorem ipsulum', Validators.required],
      processoSusepCobranca: ['XXX', Validators.required],
      versaoCobranca: ['2', Validators.required],
      situacaoCobranca: ['Pendente', Validators.required],
      inicioComercializacaoCobranca: ['19/07/2017', Validators.required],
      parceiroCobranca: [null, Validators.required],
      tipoLocalVendaCobranca: [null, Validators.required],
      periodicidadePagamentoCobranca: [null, Validators.required],
      parcelaAntecipadaCobranca: [null, Validators.required],
      dataVencimentoCobranca: [null, Validators.required],
      formaPagamentoCobranca: [null, Validators.required],
      momentoCobranca: [null, Validators.required],
      convenioCobranca: [null, Validators.required],
      origemCobranca: [null, Validators.required],
      custeioSeguroCobranca: [null, Validators.required],
      cedenteCobranca: [null, Validators.required],
      periodicidadePagamentoDemaisCobranca: [null, Validators.required],
      formaPagamentoDemaisCobranca: [null, Validators.required],
      convenioCobrancaDemaisCobranca: [null, Validators.required],
      diasVencimentoDemaisCobranca: [null, Validators.required],
      cedenteDemaisCobranca: [null, Validators.required],
      periodicidadeInadimplenciaCobranca: [null, Validators.required],
      toleranciaInadimplenciaCobranca: [null, Validators.required],
      quantidadeParcelasInadimplenciaCobranca: [null, Validators.required],
      inadimplenciaParcelaSeguro: [null, Validators.required],
      cartaoDebitoInadimplencia: [null, Validators.required],
      debitoBoletoInadimplencia: [null, Validators.required],
      multaInadimplenciaCobranca: [null, Validators.required],
      unidadeReferenciaMultaInadimplencia: [null, Validators.required],
      valorPercentualInadimplencia: [null, Validators.required],
      jurosInadimplenciaCobranca: [null, Validators.required],
      jurosMesInadimplenciaCobranca: [null, Validators.required],
      tabelaPrazoCurtoInadimplencia: [null, Validators.required]

    });
  }

  onSubmit() { }

}
