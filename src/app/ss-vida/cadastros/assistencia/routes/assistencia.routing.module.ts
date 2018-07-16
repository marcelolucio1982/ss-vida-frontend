import { AssistenciaComponent } from '../assistencia.component';
import { AssistenciaFormComponent } from './../assistencia-form/assistencia-form.component';

import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const assistenciaRoutes = [
    {path: '', component: AssistenciaComponent},

    //  Path para criar Nova Assistencia
    {path: 'novo', component: AssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar Assistencia
    {path: ':id/versoes/:versao', component: AssistenciaFormComponent},

    // Path para Editar Assistencia
    {path: ':id/versoes/:versao/editar', component: AssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para gerar Nova Versao
    {path: ':id/versoes/:versao/novo', component: AssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar Assistencia
    {path: ':id/versoes/:versao/encerrar', component: AssistenciaFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(assistenciaRoutes)],
    exports: [RouterModule]
})
export class AssistenciaRoutingModule {
}
