import { ParceiroComponent } from '../parceiro.component';
import { ParceiroFormComponent } from './../parceiro-form/parceiro-form.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const parceiroRoutes = [
    {path: '', component: ParceiroComponent},

    //  Path para criar Nova
    {path: 'novo', component: ParceiroFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor', component: ParceiroFormComponent},

    // Path para Editar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar',
        component: ParceiroFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar', component: ParceiroFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(parceiroRoutes)],
    exports: [RouterModule]
})
export class ParceiroRoutingModule {
}
