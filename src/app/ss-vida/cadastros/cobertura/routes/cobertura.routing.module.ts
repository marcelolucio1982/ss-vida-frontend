import { CoberturaFormComponent } from './../cobertura-form/cobertura-form.component';
import { CoberturaDetalheComponent } from './../cobertura-detalhe/cobertura-detalhe.component';
import { CoberturaGuard } from './guards/cobertura.guard';
import { CoberturaComponent } from './../cobertura.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const coberturaRoutes = [
  {path: '', component: CoberturaComponent}, // pesquisar
  {path: 'novo', component: CoberturaFormComponent}, // cadastrar
  {path: ':id', component: CoberturaDetalheComponent}, // listar versões
  {path: ':id/versoes/:versao', component: CoberturaFormComponent}, // editar
  {path: ':id/versoes/:versao/novo', component: CoberturaFormComponent} // criar versão
];

@NgModule({
  imports: [RouterModule.forChild(coberturaRoutes)],
  exports: [RouterModule]
})
export class CoberturaRoutingModule { }
