import { VendedorComponent } from '../vendedor.component';
import { VendedorFormComponent } from './../vendedor-form/vendedor-form.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const vendedorRoutes = [

    {path: '', component: VendedorComponent},

    //  Path para criar Novo Vendedor
    {path: 'novo', component: VendedorFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Visualizar Vendedor
    {path: ':id/dthCadastramento/:dthCadastramento', component: VendedorFormComponent},

    // Path para Editar Vendedor
    {path: ':id/dthCadastramento/:dthCadastramento/editar', component: VendedorFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para gerar Nova Versao
    {path: ':id/dthCadastramento/:dthCadastramento/novo', component: VendedorFormComponent, canDeactivate: [CanDeactivateGuard]},

    // Path para Encerrar Vendedor
    {path: ':id/dthCadastramento/:dthCadastramento/encerrar', component: VendedorFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(vendedorRoutes)],
    exports: [RouterModule]
})
export class VendedorRoutingModule {
}
