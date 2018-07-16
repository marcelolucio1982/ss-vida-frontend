import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';
import { LocalVendaComponent } from '../local-venda.component';
import { LocalVendaDetalheComponent } from './../local-venda-detalhe/local-venda-detalhe.component';
import { LocalVendaFormComponent } from './../local-venda-form/local-venda-form.component';

const localVendaRoutes = [
    {path: '', component: LocalVendaComponent},
    {path: 'novo', component: LocalVendaFormComponent},
    {path: ':id/:dataHoraCadastramento/visualizar', component: LocalVendaDetalheComponent},
    {path: ':id/:dataHoraCadastramento/editar', component: LocalVendaFormComponent},
    {path: 'versao', component: LocalVendaFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(localVendaRoutes)],
    exports: [RouterModule]
})

export class LocalVendaRoutingModule {
}
