import { ConfigurarCobrancaFormComponent } from './../configurar-cobranca-form/configurar-cobranca-form.component';
import { ConfigurarCobrancaComponent } from './../configurar-cobranca.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const configurarCobrancaRoutes = [
  {path: '', component: ConfigurarCobrancaComponent}, // pesquisar
  {path: 'novo', component: ConfigurarCobrancaFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ConfigurarCobrancaFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ConfigurarCobrancaFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ConfigurarCobrancaFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ConfigurarCobrancaFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(configurarCobrancaRoutes)],
  exports: [RouterModule]
})
export class ConfigurarCobrancaRoutingModule {
}
