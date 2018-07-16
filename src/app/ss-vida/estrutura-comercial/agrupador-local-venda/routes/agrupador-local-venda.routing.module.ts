import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

import { AgrupadorLocalVendaComponent } from '../agrupador-local-venda.component';
import { AgrupadorLocalVendaDetalheComponent } from './../agrupador-local-venda-detalhe/agrupador-local-venda-detalhe.component';
import { AgrupadorLocalVendaFormComponent } from './../agrupador-local-venda-form/agrupador-local-venda-form.component';

const localVendaRoutes = [
    {path: '', component: AgrupadorLocalVendaComponent},
    {path: 'novo', component: AgrupadorLocalVendaFormComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraCadastramento/editar', component: AgrupadorLocalVendaFormComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraCadastramento/visualizar', component: AgrupadorLocalVendaDetalheComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraCadastramento/encerrar', component: AgrupadorLocalVendaFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(localVendaRoutes)],
    exports: [RouterModule]
})

export class AgrupadorLocalVendaRoutingModule {
}
