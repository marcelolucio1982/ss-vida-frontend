import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarResumoComponent } from './configurar-resumo.component';
import { ConfigurarResumoFormComponent } from './configurar-resumo-form/configurar-resumo-form.component';
import { ConfigurarResumoRoutingModule } from './routes/configurar-resumo.routing.module';
import { ConfigurarResumoService } from './service/configurar-resumo.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarResumoRoutingModule
  ],
  declarations: [ConfigurarResumoFormComponent, ConfigurarResumoComponent] ,
  providers: [
    ConfigurarResumoService
],
})
export class ConfigurarResumoModule { }
