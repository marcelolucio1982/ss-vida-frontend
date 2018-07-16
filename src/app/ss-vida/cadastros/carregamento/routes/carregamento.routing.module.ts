import { CarregamentoFormComponent } from './../carregamento-form/carregamento-form.component';
import { CarregamentoComponent } from './../carregamento.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const carregamentoRoutes = [
  {path: '', component: CarregamentoComponent}, // pesquisar
  {path: 'novo', component: CarregamentoFormComponent, canDeactivate: [CanDeactivateGuard]}, // cadastrar
  {path: ':sigla/versoes/:versao/novo', component: CarregamentoFormComponent, canDeactivate: [CanDeactivateGuard]}, // criar versão
  {path: ':sigla/versoes/:versao/editar', component: CarregamentoFormComponent, canDeactivate: [CanDeactivateGuard]}, // editar
  {path: ':sigla/versoes/:versao/encerrar', component: CarregamentoFormComponent, canDeactivate: [CanDeactivateGuard]}, // encerrar
  {path: ':sigla/versoes/:versao', component: CarregamentoFormComponent} // visualizar
];

@NgModule({
  imports: [RouterModule.forChild(carregamentoRoutes)],
  exports: [RouterModule]
})
export class CarregamentoRoutingModule {
}
