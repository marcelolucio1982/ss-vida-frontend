import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarCoberturaService } from './service/configurar-cobertura.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-cobertura',
  templateUrl: './configurar-cobertura.component.html',
  styleUrls: ['./configurar-cobertura.component.scss']
})
export class ConfigurarCoberturaComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarCoberturaService: ConfigurarCoberturaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoDadosGerais: ['XXX', Validators.required],
      nomeDadosGerais: ['FARMA FÁCIL MICROSEGURO', Validators.required],
      processoSusepDadosGerais: ['XXXX', Validators.required],
      versaoDadosGerais: ['2.0', Validators.required],
      situacaoDadosGerais: ['Pendente', Validators.required],
      inicioComercializacaoDadosGerais: ['xxx', Validators.required],
      inicioComercializacaoVersaoDadosGerais: [null, Validators.required],
      indiceAtualizacaoDadosGerais: [null, Validators.required],
      taxaJurosMoraMensalDadosGerais: [null, Validators.required],
      atualizacaoReajusteDadosGerais: [null, Validators.required],
      periodoPadraoApoliceDadosGerais: [null, Validators.required],
      contratacaoFormaBilheteDadosGerais: [null, Validators.required],
      recontratacaoAutomaticaDadosGerais: [null, Validators.required],
      quantidadeRecontratacaoDadosGerais: [null, Validators.required],
      moedaPremioDadosGerais: [null, Validators.required],
      reenquadramentoPremioDadosGerais: [null, Validators.required],
      gerarNumeroApoliceOnlineDadosGerais: [null, Validators.required],
      prazoIndenizacaoSinistroDadosGerais: [null, Validators.required],
      prazoSuspensaoSinistroDadosGerais: [null, Validators.required],
      emissaoManualDadosGerais: [null, Validators.required],
      possuiAssistenciaServicoDadosGerais: [null, Validators.required],
      quantidadeMinimaAssistenciaDadosGerais: [null, Validators.required],
      quantidadeMaximaAssisntenciasDadosGerais: [null, Validators.required],
      possuiDpsDadosGerais: [null, Validators.required],
      possuiAcopladosDadosGerais: [null, Validators.required],
      possuiComunicacaoVendaDadosGerais: [null, Validators.required],
      possuiResseguroDadosGerais: [null, Validators.required],
      possuiCosseguroDadosGerais: [null, Validators.required],
      limiteTecnicoCiaDadosGerais: [null, Validators.required],
      periodicidadePagamentoDadosGerais: [null, Validators.required],
      possuiVigenciaEspecificaDadosGerais: [null, Validators.required],
      periodoVigenciaPeriodicidadeDadosGerais: [null, Validators.required],
      parceiroDadosGerais: [null, Validators.required],
      tipoLocalVendaDadosGerais: [null, Validators.required],
      sensibilizacaoDadosGerais: [null, Validators.required]
    });
  }

  onSubmit() { }

}
