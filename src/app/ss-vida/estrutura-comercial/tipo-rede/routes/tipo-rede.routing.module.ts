import { TipoRedeComponent } from '../tipo-rede.component';
import { TipoRedeFormComponent } from './../tipo-rede-form/tipo-rede-form.component';

import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const tipoRedeRoutes = [
    {path: '', component: TipoRedeComponent},

    //  Path para criar Nova
    {path: 'novo', component: TipoRedeFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor', component: TipoRedeFormComponent},

    // Path para Editar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar',
        component: TipoRedeFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar', component: TipoRedeFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(tipoRedeRoutes)],
    exports: [RouterModule]
})
export class TipoRedeRoutingModule {
}
