import { PrecificacaoFormComponent } from './../precificacao-form/precificacao-form.component';
import { PrecificacaoComponent } from './../precificacao.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const precificacaoRoutes = [
  {path: '', component: PrecificacaoComponent}, // pesquisar
  {path: 'novo', component: PrecificacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: PrecificacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: PrecificacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: PrecificacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: PrecificacaoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(precificacaoRoutes)],
  exports: [RouterModule]
})
export class PrecificacaoRoutingModule {
}
