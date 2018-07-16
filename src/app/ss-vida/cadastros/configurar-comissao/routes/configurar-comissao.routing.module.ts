import { ConfigurarComissaoFormComponent } from './../configurar-comissao-form/configurar-comissao-form.component';
import { ConfigurarComissaoComponent } from './../configurar-comissao.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarComissaoRoutes = [
  {path: '', component: ConfigurarComissaoComponent}, // pesquisar
  {path: 'novo', component: ConfigurarComissaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarComissaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarComissaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarComissaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarComissaoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarComissaoRoutes)],
  exports: [RouterModule]
})
export class ConfigurarComissaoRoutingModule {
}
