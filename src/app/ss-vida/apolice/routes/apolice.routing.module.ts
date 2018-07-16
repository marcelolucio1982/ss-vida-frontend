import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApoliceComponent } from '../apolice.component';
import { ApoliceDetalheComponent } from './../apolice-detalhe/apolice-detalhe.component';
import { DadosApoliceComponent } from './../apolice-detalhe/dados-apolice/dados-apolice.component';
import { CobrancaDevolucaoComponent } from './../apolice-detalhe/cobranca-devolucao/cobranca-devolucao.component';
import { DetalheCobrancaComponent } from './../apolice-detalhe/detalhe-cobranca/detalhe-cobranca.component';
import { DetalheDevolucaoComponent } from './../apolice-detalhe/detalhe-devolucao/detalhe-devolucao.component';
import { ComunicacaoVendaPosVendaComponent } from './../apolice-detalhe/comunicacao-venda-posvenda/comunicacao-venda-posvenda.component';
import { ComissaoComponent } from './../apolice-detalhe/comissao/comissao.component';
import { EndossoComponent } from '../endosso/endosso.component';
import { EndossoCadastrarComponent } from '../endosso/endosso-cadastrar/endosso-cadastrar.component';

const apoliceRoutes = [
    {path: '', component: ApoliceComponent},
    {path: 'novo', component: ApoliceComponent},
    {path: ':id',
      component: ApoliceDetalheComponent,
      children: [
        {path: '', redirectTo: 'dados-apolice', pathMatch: 'full'},
        {path: 'dados-apolice', component: DadosApoliceComponent},
        {path: 'cobranca-devolucao', component: CobrancaDevolucaoComponent},
        {path: 'comunicacao-venda-posvenda', component: ComunicacaoVendaPosVendaComponent},
        {path: 'cobranca-devolucao/:endosso/parcelas/:parcela/cobranca', component: DetalheCobrancaComponent},
        {path: 'cobranca-devolucao/:endosso/parcelas/:parcela/devolucao', component: DetalheDevolucaoComponent},
        {path: 'comissao', component: ComissaoComponent},
        {path: 'endosso', component: EndossoComponent},
        {path: 'endosso/cadastrar', component: EndossoCadastrarComponent},
        {path: 'endosso/editar', component: EndossoCadastrarComponent},
      ]},
    {path: 'versao', component: ApoliceComponent},
    {path: 'pesquisar', component: ApoliceComponent},
    {path: 'detalhe', component: ApoliceDetalheComponent}
];

@NgModule({
    imports: [RouterModule.forChild(apoliceRoutes)],
    exports: [RouterModule]
})
export class ApoliceRoutingModule {
}
