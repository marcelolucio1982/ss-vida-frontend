import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarAssistenciaComponent } from './configurar-assistencia.component';
import { ConfigurarAssistenciaFormComponent } from './configurar-assistencia-form/configurar-assistencia-form.component';
import { ConfigurarAssistenciaRoutingModule } from './routes/configurar-assistencia.routing.module';
import { ConfigurarAssistenciaService } from './service/configurar-assistencia.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarAssistenciaRoutingModule
  ],
  declarations: [ConfigurarAssistenciaFormComponent, ConfigurarAssistenciaComponent] ,
  providers: [
    ConfigurarAssistenciaService
],
})
export class ConfigurarAssistenciaModule { }
