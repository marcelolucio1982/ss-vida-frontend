import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarCoberturaComponent } from './configurar-cobertura.component';
import { ConfigurarCoberturaFormComponent } from './configurar-cobertura-form/configurar-cobertura-form.component';
import { ConfigurarCoberturaRoutingModule } from './routes/configurar-cobertura.routing.module';
import { ConfigurarCoberturaService } from './service/configurar-cobertura.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarCoberturaRoutingModule
  ],
  declarations: [ConfigurarCoberturaFormComponent, ConfigurarCoberturaComponent] ,
  providers: [
    ConfigurarCoberturaService
],
})
export class ConfigurarCoberturaModule { }
