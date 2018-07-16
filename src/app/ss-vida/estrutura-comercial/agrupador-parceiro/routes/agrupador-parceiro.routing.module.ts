import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgrupadorParceiroComponent } from '../agrupador-parceiro.component';
import { AgrupadorParceiroDetalheComponent } from './../agrupador-parceiro-detalhe/agrupador-parceiro-detalhe.component';
import { AgrupadorParceiroFormComponent } from './../agrupador-parceiro-form/agrupador-parceiro-form.component';
import { CanDeactivateGuard } from './../../../shared/services/can-deactivate-guard.service';

const agrupadorParceiroRoutes = [
    {path: '', component: AgrupadorParceiroComponent},
    {path: 'novo', component: AgrupadorParceiroFormComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraAtualizacao/editar', component: AgrupadorParceiroFormComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraAtualizacao/visualizar', component: AgrupadorParceiroDetalheComponent},
    {path: ':id/:dataInicioVigencia/:dataHoraAtualizacao/encerrar', component: AgrupadorParceiroFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(agrupadorParceiroRoutes)],
    exports: [RouterModule]
})
export class AgrupadorParceiroRoutingModule {
}
