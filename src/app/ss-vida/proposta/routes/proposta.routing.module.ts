import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropostaComponent } from '../proposta.component';
import { PropostaDetalheComponent } from './../proposta-detalhe/proposta-detalhe.component';
import { PropostaDeclinioComponent } from './../proposta-declinio/proposta-declinio.component';

const propostaRoutes = [
    {path: '', component: PropostaComponent},
    {path: 'novo', component: PropostaComponent},
    {path: ':id', component: PropostaDetalheComponent},
    {path: 'versao', component: PropostaComponent},

    // Path para Declinar Proposta
    {path: ':id/declinar', component: PropostaDeclinioComponent}
];

@NgModule({
    imports: [RouterModule.forChild(propostaRoutes)],
    exports: [RouterModule]
})
export class PropostaRoutingModule {
}
