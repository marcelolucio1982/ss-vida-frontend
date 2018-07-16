import { ImportacaoFormComponent } from './../importacao-form/importacao-form.component';
import { ImportacaoComponent } from './../importacao.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const importacaoRoutes = [
  {path: '', component: ImportacaoComponent}, // pesquisar
  {path: 'novo', component: ImportacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: ImportacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: ImportacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: ImportacaoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: ImportacaoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(importacaoRoutes)],
  exports: [RouterModule]
})
export class ImportacaoRoutingModule {
}
