import { ConfigurarResumoFormComponent } from './../configurar-resumo-form/configurar-resumo-form.component';
import { ConfigurarResumoComponent } from './../configurar-resumo.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarResumoRoutes = [
  {path: '', component: ConfigurarResumoComponent}, // pesquisar
  {path: 'novo', component: ConfigurarResumoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarResumoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarResumoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarResumoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarResumoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarResumoRoutes)],
  exports: [RouterModule]
})
export class ConfigurarResumoRoutingModule {
}
