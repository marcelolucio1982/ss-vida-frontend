import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracaoProdutoComponent } from './../configuracao-produto.component';
import { ConfiguracaoProdutoHomeComponent } from './../home/configuracao-produto-home.component';
import { ConfiguracaoVisualizacaoComponent } from '../home/visualizacao/configuracao-visualizacao.component';
import { ConfiguracaoDashboardComponent } from './../home/dashboard/configuracao-dashboard.component';
import { ConfiguracaoDadosGeraisComponent } from './../home/dados-gerais/configuracao-dados-gerais.component';
import { ConfiguracaoCoberturaComponent } from './../configuracao-cobertura/configuracao-cobertura.component';
import { ConfiguracaoAssistenciasComponent } from '../configuracao-assistencias/configuracao-assistencias.component';
import { ConfiguracaoAcopladosComponent } from './../configuracao-acoplados/configuracao-acoplados.component';

const configuracaoProdutoRoutes = [
    {path: '', component: ConfiguracaoProdutoComponent},

    {path: 'configurar/:id/versao/:versao', component: ConfiguracaoProdutoHomeComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: ConfiguracaoDashboardComponent},
            {path: 'visualizar', component: ConfiguracaoVisualizacaoComponent},
            {path: 'dados-gerais', component: ConfiguracaoDadosGeraisComponent},
            {path: 'dados-gerais/novo', component: ConfiguracaoDadosGeraisComponent},
            {path: 'dados-gerais/editar', component: ConfiguracaoDadosGeraisComponent},

            {path: 'coberturas', component: ConfiguracaoCoberturaComponent},
            {path: 'assistencias', component: ConfiguracaoAssistenciasComponent },

            {path: 'acoplados', component: ConfiguracaoAcopladosComponent},
            {path: 'acoplados/novo', component: ConfiguracaoAcopladosComponent},
            {path: 'acoplados/editar', component: ConfiguracaoAcopladosComponent},

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(configuracaoProdutoRoutes)],
    exports: [RouterModule]
})
export class ConfiguracaoProdutoRoutingModule {
}
