import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarCobrancaComponent } from './configurar-cobranca.component';
import { ConfigurarCobrancaFormComponent } from './configurar-cobranca-form/configurar-cobranca-form.component';
import { ConfigurarCobrancaRoutingModule } from './routes/configurar-cobranca.routing.module';
import { ConfigurarCobrancaService } from './service/configurar-cobranca.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarCobrancaRoutingModule
  ],
  declarations: [ConfigurarCobrancaFormComponent, ConfigurarCobrancaComponent] ,
  providers: [
    ConfigurarCobrancaService
],
})
export class ConfigurarCobrancaModule { }
