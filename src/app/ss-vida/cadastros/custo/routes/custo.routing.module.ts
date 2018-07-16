import { CustoDetalheComponent } from './../custo-detalhe/custo-detalhe.component';
import { CustoFormComponent } from './../custo-form/custo-form.component';
import { CustoComponent } from './../custo.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const custoRoutes = [
    {path: '', component: CustoComponent},
    {path: 'novo', component: CustoFormComponent},
    {path: ':id', component: CustoDetalheComponent},
    {path: ':id/editar', component: CustoDetalheComponent}
];

@NgModule({
    imports: [RouterModule.forChild(custoRoutes)],
    exports: [RouterModule]
})
export class CustoRoutingModule {
}
