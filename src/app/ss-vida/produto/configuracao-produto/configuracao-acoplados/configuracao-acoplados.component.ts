import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';

@Component({
  selector: 'app-configuracao-acoplados',
  templateUrl: './configuracao-acoplados.component.html',
  styleUrls: ['./configuracao-acoplados.component.scss']
})
export class ConfiguracaoAcopladosComponent implements OnInit {
  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoConfigAcoplados: ['XXXX', Validators.required],
      nomeConfigAcopladoss: ['FARMA FÁCIL MICROSEGURO', Validators.required],
      processoSusepConfigAcopladoss: ['XXX', Validators.required],
      versaoConfigAcopladoss: ['2', Validators.required],
      situacaoConfigAcopladoss: ['Pendente', Validators.required],
      inicioComercializacaoConfigAcopladoss: ['12/08/2017', Validators.required],
      parceiroConfigAcopladoss: [null, Validators.required],
      tipoLocalVendaConfigAcopladoss: [null, Validators.required],
      nomeImpressaoConfigAcopladoss: [null, Validators.required],
      acopladosServicoConfigAcopladoss: [null, Validators.required],
      valorConfigAcopladoss: [null, Validators.required],
      empresaAcopladosConfigAcopladoss: [null, Validators.required],
      contratoConfigAcopladoss: [null, Validators.required],
      formaContratacaoConfigAcopladoss: [null, Validators.required],
      formaContratacaoConfigAcopladossSelect: [null, Validators.required],
      pacoteConfigAcopladoss: [null, Validators.required],
      acionamentoConfigAcopladoss: [null, Validators.required],
      eventoConfigAcopladoss: [null, Validators.required],
      beneficiarioConfigAcopladoss: [null, Validators.required],
      brasilConfigAcopladoss: [null, Validators.required],
      mundoConfigAcopladoss: [null, Validators.required],
      maximoAcionamentoConfigAcopladoss: [null, Validators.required],
      quantidadeAcionamentoConfigAcopladoss: [null, Validators.required],
      observacoesConfigAcopladoss: [null, Validators.required],
      periodicidadePagamentoConfigAcopladoss: [null, Validators.required],
      antecipadoConfigAcopladoss: [null, Validators.required],
      mensalConfigAcopladoss: [null, Validators.required],
      pagamentoUnicoConfigAcopladoss: [null, Validators.required],
      porProfissaoConfigAcopladoss: [null, Validators.required],
      profissoesLeftConfigAcopladoss: [null, Validators.required],
      profissoesRighttConfigAcopladoss: [null, Validators.required]
    });
  }

  onSubmit() { }

}
