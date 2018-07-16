import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { ConstantesService } from './../../../../../shared/services/constantes.service';

@Component({
  moduleId: module.id,
  selector: 'app-periodicidade-pagamentos',
  templateUrl: './periodicidade-pagamentos.component.html'
})
export class PeriodicidadePagamentosComponent implements OnInit {

  public isExibePeriodoVigencia: any = false;

  @Input()
  public periodicidadeForm: FormGroup;

  constructor(
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.isExibePeriodoVigencia = this.isIndicadorVigenciaSim() || this.isPossuiVigenciaDefault();
  }

  isPeriodicidadeValida() {
    const periodicidadeAgrupada = this.periodicidadeForm.controls.periodicidadeAgrupada;
    if (periodicidadeAgrupada instanceof FormGroup) {
      const periodicidadeAgrupadaFrmGroup = <FormGroup>periodicidadeAgrupada;
      const periodicidade = periodicidadeAgrupadaFrmGroup.controls.periodicidade;
      return periodicidade.value !== null;
    }
    return false;
  }

  isPossuiVigenciaDefault() {
    const periodo = this.periodicidadeForm.controls.periodo;
    if ( periodo instanceof FormGroup ) {
      const periodoFrmGroup = <FormGroup>periodo;
      return (periodoFrmGroup.controls['periodicidade'].value
        && periodoFrmGroup.controls['periodicidade'].value.codigo > 0)
          && periodoFrmGroup.controls['quantidade'].value !== '';
    }
    return false;
  }

  isIndicadorVigenciaSim() {
    const periodicidadeAgrupada = this.periodicidadeForm.controls.periodicidadeAgrupada;
    if (periodicidadeAgrupada instanceof FormGroup) {
      const periodicidadeAgrupadaFrmGroup = <FormGroup>periodicidadeAgrupada;
      const indicadorVigencia = periodicidadeAgrupadaFrmGroup.controls['indicadorVigencia'];
      return indicadorVigencia.value && indicadorVigencia.value.codigo === 'S';
    }
    return false;
  }

  exibePeriodoVigencia( indicadorVigenciaSelected ) {
    this.isExibePeriodoVigencia = false;
    if ( indicadorVigenciaSelected ) {
      this.isExibePeriodoVigencia = this.isIndicadorVigenciaSim();
      const periodo = this.periodicidadeForm.controls.periodo;
      if ( periodo instanceof FormGroup ) {
        const periodoFrmGroup = <FormGroup>periodo;
        periodoFrmGroup.controls['periodicidade'].disable();
        periodoFrmGroup.controls['quantidade'].disable();
        if ( this.isExibePeriodoVigencia ) {
          periodoFrmGroup.controls['periodicidade'].enable();
          periodoFrmGroup.controls['quantidade'].enable();
        }
      }
    }
  }

}
