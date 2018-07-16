import { TipoVendedorComponent } from '../tipo-vendedor.component';
import { TipoVendedorFormComponent } from './../tipo-vendedor-form/tipo-vendedor-form.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const tipoVendedorRoutes = [
    {path: '', component: TipoVendedorComponent},

    //  Path para criar Nova
    {path: 'novo', component: TipoVendedorFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor', component: TipoVendedorFormComponent},

    // Path para Editar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/editar',
        component: TipoVendedorFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar
    {path: ':id/vigencia/:vigencia_valor/atualizacao/:atualizacao_valor/encerrar', component: TipoVendedorFormComponent}

];

@NgModule({
    imports: [RouterModule.forChild(tipoVendedorRoutes)],
    exports: [RouterModule]
})
export class TipoVendedorRoutingModule {
}
