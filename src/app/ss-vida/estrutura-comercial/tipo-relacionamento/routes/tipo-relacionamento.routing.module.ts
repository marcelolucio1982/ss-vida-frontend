import { TipoRelacionamentoComponent } from '../tipo-relacionamento.component';
import { TipoRelacionamentoFormComponent } from './../tipo-relacionamento-form/tipo-relacionamento-form.component';

import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const tipoRelacionamentoRoutes = [
    {path: '', component: TipoRelacionamentoComponent},

    //  Path para criar Nova
    {path: 'novo', component: TipoRelacionamentoFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor', component: TipoRelacionamentoFormComponent},

    // Path para Editar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar',
        component: TipoRelacionamentoFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar', component: TipoRelacionamentoFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(tipoRelacionamentoRoutes)],
    exports: [RouterModule]
})
export class TipoRelacionamentoRoutingModule {
}
