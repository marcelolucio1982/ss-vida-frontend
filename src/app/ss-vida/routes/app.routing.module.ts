import { CoberturaGuard } from './../cadastros/cobertura/routes/guards/cobertura.guard';
import { PaginaNaoEncontradaComponent } from './../error/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'produto',
    loadChildren: 'app/ss-vida/produto/produto.module#ProdutoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'cobertura',
    loadChildren: 'app/ss-vida/cadastros/cobertura/cobertura.module#CoberturaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'local-venda',
    loadChildren: 'app/ss-vida/estrutura-comercial/local-venda/local-venda.module#LocalVendaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'comissionado',
    loadChildren: 'app/ss-vida/estrutura-comercial/comissionado/comissionado.module#ComissionadoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'agrupador-local-venda',
    loadChildren: 'app/ss-vida/estrutura-comercial/agrupador-local-venda/agrupador-local-venda.module#AgrupadorLocalVendaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'tipo-local-venda',
    loadChildren: 'app/ss-vida/estrutura-comercial/tipo-local-venda/tipo-local-venda.module#TipoLocalVendaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'tipo-vendedor',
    loadChildren: 'app/ss-vida/estrutura-comercial/tipo-vendedor/tipo-vendedor.module#TipoVendedorModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'tipo-relacionamento',
    loadChildren: 'app/ss-vida/estrutura-comercial/tipo-relacionamento/tipo-relacionamento.module#TipoRelacionamentoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'agrupador-parceiro',
    loadChildren: 'app/ss-vida/estrutura-comercial/agrupador-parceiro/agrupador-parceiro.module#AgrupadorParceiroModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'parceiro',
    loadChildren: 'app/ss-vida/estrutura-comercial/parceiro/parceiro.module#ParceiroModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'vendedor',
    loadChildren: 'app/ss-vida/estrutura-comercial/vendedor/vendedor.module#VendedorModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'proposta',
    loadChildren: 'app/ss-vida/proposta/proposta.module#PropostaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'endosso',
    loadChildren: 'app/ss-vida/endosso/endosso.module#EndossoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'apolice',
    loadChildren: 'app/ss-vida/apolice/apolice.module#ApoliceModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'historico',
    loadChildren: 'app/ss-vida/historico/historico.module#HistoricoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'tipo-rede',
    loadChildren: 'app/ss-vida/estrutura-comercial/tipo-rede/tipo-rede.module#TipoRedeModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'importacao',
    loadChildren: 'app/ss-vida/cadastros/importacao/importacao.module#ImportacaoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'precificacao',
    loadChildren: 'app/ss-vida/cadastros/precificacao/precificacao.module#PrecificacaoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-cobertura',
    loadChildren: 'app/ss-vida/cadastros/configurar-cobertura/configurar-cobertura.module#ConfigurarCoberturaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-resumo',
    loadChildren: 'app/ss-vida/cadastros/configurar-resumo/configurar-resumo.module#ConfigurarResumoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-subscricao',
    loadChildren: 'app/ss-vida/cadastros/configurar-subscricao/configurar-subscricao.module#ConfigurarSubscricaoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-cobranca',
    loadChildren: 'app/ss-vida/cadastros/configurar-cobranca/configurar-cobranca.module#ConfigurarCobrancaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-comissao',
    loadChildren: 'app/ss-vida/cadastros/configurar-comissao/configurar-comissao.module#ConfigurarComissaoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configurar-assistencia',
    loadChildren: 'app/ss-vida/cadastros/configurar-assistencia/configurar-assistencia.module#ConfigurarAssistenciaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'assistencia',
    loadChildren: 'app/ss-vida/cadastros/assistencia/assistencia.module#AssistenciaModule',
    canActivate: [AuthGuard],
    // canActivateChild: [AssistenciaGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'custo',
    loadChildren: 'app/ss-vida/cadastros/custo/custo.module#CustoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'carregamento',
    loadChildren: 'app/ss-vida/cadastros/carregamento/carregamento.module#CarregamentoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'fornecedor',
    loadChildren: 'app/ss-vida/cadastros/fornecedor/fornecedor.module#FornecedorModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'empresas-assistencia',
    loadChildren: 'app/ss-vida/cadastros/empresas-assistencia/empresas-assistencia.module#EmpresasAssistenciaModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'cadastro-produto',
    loadChildren: 'app/ss-vida/produto/cadastro-produto/cadastro-produto.module#CadastroProdutoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'configuracao-produto',
    loadChildren: 'app/ss-vida/produto/configuracao-produto/configuracao-produto.module#ConfiguracaoProdutoModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
