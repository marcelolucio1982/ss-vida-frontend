import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarregamentoComponent } from './carregamento.component';
import { CarregamentoFormComponent } from './carregamento-form/carregamento-form.component';
import { CarregamentoRoutingModule } from './routes/carregamento.routing.module';
import { CarregamentoService } from './service/carregamento.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CarregamentoRoutingModule
  ],
  declarations: [CarregamentoFormComponent, CarregamentoComponent] ,
  providers: [
    CarregamentoService
],
})
export class CarregamentoModule { }
