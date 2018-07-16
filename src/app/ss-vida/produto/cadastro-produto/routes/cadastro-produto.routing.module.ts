import { CadastroProdutoDetalheComponent } from './../cadastro-produto-detalhe/cadastro-produto-detalhe.component';
import { CadastroProdutoFormComponent } from './../cadastro-produto-form/cadastro-produto-form.component';
import { CadastroProdutoComponent } from './../cadastro-produto.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const cadastroProdutoRoutes = [
    {path: '', component: CadastroProdutoComponent},
    {path: 'visualizar', component: CadastroProdutoDetalheComponent},
    {path: 'novo', component: CadastroProdutoFormComponent},
    {path: ':codigo', component: CadastroProdutoFormComponent},
    {path: ':codigo/editar', component: CadastroProdutoFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(cadastroProdutoRoutes)],
    exports: [RouterModule]
})
export class CadastroProdutoRoutingModule {
}
