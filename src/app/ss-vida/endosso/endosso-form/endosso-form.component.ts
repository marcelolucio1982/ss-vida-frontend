import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EndossoService } from './../service/endosso.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-endosso-form',
  templateUrl: './endosso-form.component.html',
  styleUrls: ['./endosso-form.component.css']
})
export class EndossoFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoAgrupadorParceiroService: EndossoService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cadCodigoExternoVendedor: [null, Validators.required],
      cadCpfVendedor: [null, Validators.required],
      cadNomeVendedor: [null, Validators.required],
      cadParceiroVendedor: [null, Validators.required],
      cadTipoVendedor: [null, Validators.required],
      cadDataInicioVigenciaVendedor: [null, Validators.required],
      cadInicioVigenciaParceiro: [null, Validators.required],
      parceiroLocalVenda: [null, Validators.required],
      opcaoLocalVenda: [null, Validators.required],
      codigoExternoNomeLocalVenda: [null, Validators.required],
      motivoEndosso: [null, Validators.required],
    });

  }

  ngOnDestroy() { }

  cadastrar() {
    alert(`Clicado no botão Cadastrar`);
  }
  incluir() {
    alert(`Clicado no botão Incluir`);
  }
}
