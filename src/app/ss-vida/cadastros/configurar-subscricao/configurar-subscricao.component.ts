import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigurarSubscricaoService } from './service/configurar-subscricao.service';
import { ConstantesService } from '../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';

@Component({
  selector: 'app-configurar-subscricao',
  templateUrl: './configurar-subscricao.component.html',
  styleUrls: ['./configurar-subscricao.component.scss']
})
export class ConfigurarSubscricaoComponent implements OnInit {

  formulario: FormGroup;
  public retorno: any = false;

  constructor(
    private configurarSubscricaoService: ConfigurarSubscricaoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoSubscricao: ['XXX', Validators.required],
      nomeSubscricao: ['Lorem ipsulum', Validators.required],
      processoSusepSubscricao: ['XXX', Validators.required],
      versaoSubscricao: ['2', Validators.required],
      situacaoSubscricao: ['Pendente', Validators.required],
      inicioComercializacaoSubscricao: ['15/05/2017', Validators.required],
      parceiroSubscricao: [null, Validators.required],
      tipoLocalVendaSubscricao: [null, Validators.required],
      corretorApoliceSubscricao: [null, Validators.required],
      corretorSubscricao: [null, Validators.required],
      balcaoSubscricao: [null, Validators.required],
      aQuemPagarSubscricao: [null, Validators.required],
      unidadeReferenciaSubscricao: [null, Validators.required],
      parametrosSubscricao: [null, Validators.required],
      minimoParametrosSubscricao: [null, Validators.required],
      maximoParametrosSubscricao: [null, Validators.required],
      formaPagamentoSubscricao: [null, Validators.required],
      criterioSubscricao: [null, Validators.required],
      numeroParcelaSubscricao: [null, Validators.required],
      referenciaValorSubscricao: [null, Validators.required]

    });
  }

  onSubmit() { }

}
