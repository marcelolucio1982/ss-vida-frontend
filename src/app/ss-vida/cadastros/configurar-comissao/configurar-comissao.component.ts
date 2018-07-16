import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarComissaoService } from './service/configurar-comissao.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-comissao',
  templateUrl: './configurar-comissao.component.html',
  styleUrls: ['./configurar-comissao.component.scss']
})
export class ConfigurarComissaoComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarComissaoService: ConfigurarComissaoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoComissao: ['XXX', Validators.required],
      nomeComissao: ['Lorem ipsulum', Validators.required],
      processoSusepComissao: ['XXX', Validators.required],
      versaoComissao: ['2', Validators.required],
      situacaoComissao: ['Pendente', Validators.required],
      inicioComercializacaoComissao: ['15/05/2017', Validators.required],
      parceiroComissao: [null, Validators.required],
      tipoLocalVendaComissao: [null, Validators.required],
      corretorApoliceComissao: [null, Validators.required],
      corretorComissao: [null, Validators.required],
      balcaoComissao: [null, Validators.required],
      aQuemPagarComissao: [null, Validators.required],
      unidadeReferenciaComissao: [null, Validators.required],
      parametrosComissao: [null, Validators.required],
      minimoParametrosComissao: [null, Validators.required],
      maximoParametrosComissao: [null, Validators.required],
      formaPagamentoComissao: [null, Validators.required],
      criterioComissao: [null, Validators.required],
      numeroParcelaComissao: [null, Validators.required],
      referenciaValorComissao: [null, Validators.required]

    });
  }

  onSubmit() { }

}
