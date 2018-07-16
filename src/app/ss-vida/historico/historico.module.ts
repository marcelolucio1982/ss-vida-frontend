import { HisoricoRoutingModule } from './routes/historico.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoHeaderComponent } from './historico-header/historico-header.component';
import { HistoricoSeguroComponent } from './historico-seguro/historico-seguro.component';
import { HistoricoSeguradoComponent } from './historico-segurado/historico-segurado.component';
import { SharedModule } from '../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ProdutosSeguradoComponent } from './produtos-segurado/produtos-segurado.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TextMaskModule,
    HisoricoRoutingModule
  ],
  declarations: [
    HistoricoHeaderComponent,
    HistoricoSeguroComponent,
    HistoricoSeguradoComponent,
    ProdutosSeguradoComponent
  ]
})
export class HistoricoModule { }
