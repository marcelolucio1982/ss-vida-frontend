import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoModule } from '../historico.module';
import { HistoricoSeguradoComponent } from '../historico-segurado/historico-segurado.component';
import { HistoricoSeguroComponent } from '../historico-seguro/historico-seguro.component';
import { ProdutosSeguradoComponent } from '../produtos-segurado/produtos-segurado.component';

const historicoRoutes = [
    {path: 'historico-seguro/:id', component: HistoricoSeguroComponent},
    {path: 'historico-segurado/:id', component: HistoricoSeguradoComponent},
    {path: 'produtos-segurado/:id/:cpf', component: ProdutosSeguradoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(historicoRoutes)],
    exports: [RouterModule]
})
export class HisoricoRoutingModule {
}
