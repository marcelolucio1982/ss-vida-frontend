import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';
import { ComissionadoComponent } from '../comissionado.component';
import { ComissionadoDetalheComponent } from './../comissionado-detalhe/comissionado-detalhe.component';
import { ComissionadoFormComponent } from './../comissionado-form/comissionado-form.component';

const comissionadoRoutes = [
    {path: '', component: ComissionadoComponent},
    {path: 'novo', component: ComissionadoFormComponent},
    {path: ':id/:dataAtualizacao/visualizar', component: ComissionadoDetalheComponent},
    {path: ':id/atualizacao/:dataAtualizacao', component: ComissionadoFormComponent},
    {path: ':id/versoes/:versao/novo', component: ComissionadoFormComponent, canDeactivate: [CanDeactivateGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(comissionadoRoutes)],
    exports: [RouterModule]
})
export class ComissionadoRoutingModule {
}
