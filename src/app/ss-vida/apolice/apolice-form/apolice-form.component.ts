import { Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApoliceService } from './../service/apolice.service';
import { ConstantesService } from './../../shared/services/constantes.service';
import { MensagemService } from './../../shared/services/mensagem.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-apolice-form',
  templateUrl: './apolice-form.component.html',
  styleUrls: ['./apolice-form.component.css']
})
export class ApoliceFormComponent implements OnInit, OnDestroy {
  private pathSub: any;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tipoAgrupadorParceiroService: ApoliceService,
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
    });

  }

  ngOnDestroy() { }
}
