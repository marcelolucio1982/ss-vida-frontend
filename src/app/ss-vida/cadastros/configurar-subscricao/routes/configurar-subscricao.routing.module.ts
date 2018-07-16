import { ConfigurarSubscricaoFormComponent } from './../configurar-subscricao-form/configurar-subscricao-form.component';
import { ConfigurarSubscricaoComponent } from './../configurar-subscricao.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarSubscricaoRoutes = [
  {path: '', component: ConfigurarSubscricaoComponent}, // pesquisar
  {path: 'novo', component: ConfigurarSubscricaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarSubscricaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarSubscricaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarSubscricaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarSubscricaoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarSubscricaoRoutes)],
  exports: [RouterModule]
})
export class ConfigurarSubscricaoRoutingModule {
}
