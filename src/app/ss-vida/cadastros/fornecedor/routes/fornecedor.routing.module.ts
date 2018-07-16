import { FornecedorDetalheComponent } from './../fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorFormComponent } from './../fornecedor-form/fornecedor-form.component';
import { FornecedorComponent } from './../fornecedor.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const fornecedorRoutes = [
    {path: '', component: FornecedorComponent},
    {path: 'novo', component: FornecedorFormComponent},
    {path: ':id', component: FornecedorDetalheComponent},
    {path: ':id/editar', component: FornecedorDetalheComponent}
];

@NgModule({
    imports: [RouterModule.forChild(fornecedorRoutes)],
    exports: [RouterModule]
})
export class FornecedorRoutingModule {
}
