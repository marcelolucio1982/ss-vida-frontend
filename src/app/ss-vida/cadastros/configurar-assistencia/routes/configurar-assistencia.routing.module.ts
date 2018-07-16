import { ConfigurarAssistenciaFormComponent } from './../configurar-assistencia-form/configurar-assistencia-form.component';
import { ConfigurarAssistenciaComponent } from './../configurar-assistencia.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarAssistenciaRoutes = [
  {path: '', component: ConfigurarAssistenciaComponent}, // pesquisar
  {path: 'novo', component: ConfigurarAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarAssistenciaFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarAssistenciaFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarAssistenciaRoutes)],
  exports: [RouterModule]
})
export class ConfigurarAssistenciaRoutingModule {
}
