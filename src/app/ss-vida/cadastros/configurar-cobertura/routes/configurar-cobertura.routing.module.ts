import { ConfigurarCoberturaFormComponent } from './../configurar-cobertura-form/configurar-cobertura-form.component';
import { ConfigurarCoberturaComponent } from './../configurar-cobertura.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarCoberturaRoutes = [
  {path: '', component: ConfigurarCoberturaComponent}, // pesquisar
  {path: 'novo', component: ConfigurarCoberturaFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarCoberturaFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarCoberturaFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarCoberturaFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarCoberturaFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarCoberturaRoutes)],
  exports: [RouterModule]
})
export class ConfigurarCoberturaRoutingModule {
}
