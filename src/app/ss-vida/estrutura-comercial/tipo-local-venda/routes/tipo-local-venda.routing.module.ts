import { TipoLocalVendaComponent } from '../tipo-local-venda.component';
import { TipoLocalVendaFormComponent } from './../tipo-local-venda-form/tipo-local-venda-form.component';

import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const tipoLocalVendaRoutes = [
    {path: '', component: TipoLocalVendaComponent},

    //  Path para criar Nova
    {path: 'novo', component: TipoLocalVendaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor', component: TipoLocalVendaFormComponent},

    // Path para Editar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar',
        component: TipoLocalVendaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar', component: TipoLocalVendaFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(tipoLocalVendaRoutes)],
    exports: [RouterModule]
})
export class TipoLocalVendaRoutingModule {
}
