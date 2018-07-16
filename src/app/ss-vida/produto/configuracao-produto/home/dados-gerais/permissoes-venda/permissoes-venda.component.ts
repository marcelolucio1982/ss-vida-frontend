import { ParceiroService } from './../../../../../estrutura-comercial/parceiro/service/parceiro.service';
import { UtilService } from './../../../../../shared/services/util.service';
import { TipoLocalVendaService } from './../../../../../estrutura-comercial/tipo-local-venda/service/tipo-local-venda.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConstantesService } from './../../../../../shared/services/constantes.service';

@Component({
  moduleId: module.id,
  selector: 'app-permissoes-venda',
  templateUrl: './permissoes-venda.component.html'
})
export class PermissoesVendaComponent {

  @Input()
  public permissoesVendaForm: FormGroup;

  @Input()
  public parceiroList: any;

  public tipoLocalVendaList: any = new Array();

  constructor(
    private tipoLocalVendaService: TipoLocalVendaService,
    public utilService: UtilService,
    private parceiroService: ParceiroService,
    public constantesService: ConstantesService
  ) { }

  selectTiposLocalVenda( parceiroSelected ) {
    this.tipoLocalVendaList = new Array();
    if ( parceiroSelected ) {
      this.preencherTipoLocalVendaList();
    }
  }

  preencherTipoLocalVendaList () {
    this.tipoLocalVendaList = new Array();
    const formPrincipalCtrl = this.permissoesVendaForm.parent.parent;
    const parceiroSelected = this.permissoesVendaForm.controls.parceiro.value;
    if ( formPrincipalCtrl instanceof FormGroup && parceiroSelected) {
      const formPrincipal = <FormGroup>formPrincipalCtrl;
      const dataInicioVigencia = formPrincipal.controls.dataInicioVigencia.value;
      this.tipoLocalVendaService.list({ codParceiro: parceiroSelected.codigo,
        dataInicioVigencia: this.utilService.formatarDataModelo(dataInicioVigencia) }).subscribe( res => {
        this.tipoLocalVendaList = res;
      });
    }
  }

}
