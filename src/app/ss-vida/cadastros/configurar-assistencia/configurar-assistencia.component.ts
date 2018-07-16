import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarAssistenciaService } from './service/configurar-assistencia.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-assistencia',
  templateUrl: './configurar-assistencia.component.html',
  styleUrls: ['./configurar-assistencia.component.scss']
})
export class ConfigurarAssistenciaComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarAssistenciaService: ConfigurarAssistenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoConfigAssistencia: ['XXXX', Validators.required],
      nomeConfigAssistencias: ['FARMA FÁCIL MICROSEGURO', Validators.required],
      processoSusepConfigAssistencias: ['XXX', Validators.required],
      versaoConfigAssistencias: ['2', Validators.required],
      situacaoConfigAssistencias: ['Pendente', Validators.required],
      inicioComercializacaoConfigAssistencias: ['12/08/2017', Validators.required],
      parceiroConfigAssistencias: [null, Validators.required],
      tipoLocalVendaConfigAssistencias: [null, Validators.required],
      nomeImpressaoConfigAssistencias: [null, Validators.required],
      assistenciaServicoConfigAssistencias: [null, Validators.required],
      valorConfigAssistencias: [null, Validators.required],
      empresaAssistenciaConfigAssistencias: [null, Validators.required],
      contratoConfigAssistencias: [null, Validators.required],
      formaContratacaoConfigAssistencias: [null, Validators.required],
      formaContratacaoConfigAssistenciasSelect: [null, Validators.required],
      pacoteConfigAssistencias: [null, Validators.required],
      acionamentoConfigAssistencias: [null, Validators.required],
      eventoConfigAssistencias: [null, Validators.required],
      beneficiarioConfigAssistencias: [null, Validators.required],
      brasilConfigAssistencias: [null, Validators.required],
      mundoConfigAssistencias: [null, Validators.required],
      maximoAcionamentoConfigAssistencias: [null, Validators.required],
      quantidadeAcionamentoConfigAssistencias: [null, Validators.required],
      observacoesConfigAssistencias: [null, Validators.required],
      periodicidadePagamentoConfigAssistencias: [null, Validators.required],
      antecipadoConfigAssistencias: [null, Validators.required],
      mensalConfigAssistencias: [null, Validators.required],
      pagamentoUnicoConfigAssistencias: [null, Validators.required],
      porProfissaoConfigAssistencias: [null, Validators.required],
      profissoesLeftConfigAssistencias: [null, Validators.required],
      profissoesRighttConfigAssistencias: [null, Validators.required]
    });
  }

  onSubmit() { }

}
