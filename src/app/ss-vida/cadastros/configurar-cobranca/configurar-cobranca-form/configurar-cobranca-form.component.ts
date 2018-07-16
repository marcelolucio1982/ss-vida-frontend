import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { ConfigurarCobrancaService } from './../service/configurar-cobranca.service';
import { ConstantesService } from '../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-configurar-cobranca-form',
  templateUrl: './configurar-cobranca-form.component.html',
  styleUrls: ['./configurar-cobranca-form.component.scss']
})
export class ConfigurarCobrancaFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private configurarCobrancaService: ConfigurarCobrancaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public constantesService: ConstantesService,
    private mensagemService: MensagemService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({

      codigoCobertura: [null, Validators.required],
      nomeCobertura: [null, Validators.required],
      processoSusepCobertura: [null, Validators.required],
      versaoCobertura: [null, Validators.required],
      situacaoCobertura: [null, Validators.required],
      inicioComercializacaoCobertura: [null, Validators.required],
      parceiroCobertura: [null, Validators.required],
      tipoLocalVendaCobertura: [null, Validators.required],
      enquadramentoCobertura: [null, Validators.required],
      arquivoPlanoCobertura: [null, Validators.required],
      cobertura: [null, Validators.required],
      tipoCobertura: [null, Validators.required],
      formaContratacaoCobertura: [null, Validators.required],
      tabuaCobertura: [null, Validators.required],
      grupoSusepCobertura: [null, Validators.required],
      ramoSusepCobertura: [null, Validators.required],
      ramoCaixaSegurosCobertura: [null, Validators.required],
      numeroProcessoSusepCobertura: [null, Validators.required],
      codigoPlnCobertura: [null, Validators.required],
      remissaoParcelaCobertura: [null, Validators.required],
      prazoRemissaoCobertura: [null, Validators.required],
      quantidadeCobertura: [null, Validators.required],
      algumaCoberturaRelacionada: [null, Validators.required],
      coberturaRelacionadaCobertura: [null, Validators.required],
      moedaCobertura: [null, Validators.required],
      possuiCarenciaCobertura: [null, Validators.required],
      periodoCarenciaCobertura: [null, Validators.required],
      quantidadeCarenciaCobertura: [null, Validators.required],
      existeIdadeMaximaContratacaoCobertura: [null, Validators.required],
      idadeMaximaContratacaoCobertura: [null, Validators.required],
      tabelaReenquadramentoCobertura: [null, Validators.required],
      garantiaPossuiAcumuloRiscoCobertura: [null, Validators.required],
      valorMaximoAcumuloCobertura: [null, Validators.required],
      regimeReparticaoFinanceiraCobertura: [null, Validators.required],
      possuiCapitalSeguradoCobertura: [null, Validators.required],
      utilizaCoberturaReferencia: [null, Validators.required],
      coberturaReferenciaCobertura: [null, Validators.required],
      minimoCoberturaReferenciaCobertura: [null, Validators.required],
      maximoCoberturaReferenciaCobertura: [null, Validators.required],
      sinistroCancelaSeguroCobertura: [null, Validators.required],
      podeIndenizarMaisUmaVezCobertura: [null, Validators.required],
      reintegracaoAutomaticaCobertura: [null, Validators.required],
      existeIdadeMaximaCobertura: [null, Validators.required],
      idadeMaximaCampoCobertura: [null, Validators.required],
      possuiFranquiaCobertura: [null, Validators.required],
      periodoFranquiaCobertura: [null, Validators.required],
      quantidadeFranquiaCobertura: [null, Validators.required],
      tipoSinistroCampoCobertura: [null, Validators.required],
      sinistroCancelaGarantiaCampoCobertura: [null, Validators.required],
      cancelamentosSinistroCobertura: [null, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  getEhEncerramento() { }

  getEhVisualizacao() { }

  getEhPrimeiraVersao () {}

  getEhNovaVersao () { }

  pesquisar() { }

  podeEditar() { }

  podeExcluir() { }

  podeCriarVersao() {}

  podeEncerrar() {}

  salvar() { }

  editar () { }

  excluir () { }

  encerrar () { }

  criarVersao() { }


}
