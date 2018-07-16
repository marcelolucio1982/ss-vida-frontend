import { EmpresasAssistenciaComponent } from './../empresas-assistencia.component';
import { EmpresasAssistenciaFormComponent } from './../empresas-assistencia-form/empresas-assistencia-form.component';

import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const empresasAssistenciaRoutes = [
    {path: '', component: EmpresasAssistenciaComponent},

    //  Path para criar Nova Assistencia
    {path: 'novo', component: EmpresasAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar Assistencia
    {path: ':id/versoes/:versao', component: EmpresasAssistenciaFormComponent},

    // Path para Editar Assistencia
    {path: ':id/versoes/:versao/editar', component: EmpresasAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para gerar Nova Versao
    {path: ':id/versoes/:versao/novo', component: EmpresasAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar Assistencia
    {path: ':id/versoes/:versao/encerrar', component: EmpresasAssistenciaFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(empresasAssistenciaRoutes)],
    exports: [RouterModule]
})
export class EmpresasAssistenciaRoutingModule {
}
