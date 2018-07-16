import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarSubscricaoComponent } from './configurar-subscricao.component';
import { ConfigurarSubscricaoFormComponent } from './configurar-subscricao-form/configurar-subscricao-form.component';
import { ConfigurarSubscricaoRoutingModule } from './routes/configurar-subscricao.routing.module';
import { ConfigurarSubscricaoService } from './service/configurar-subscricao.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarSubscricaoRoutingModule
  ],
  declarations: [ConfigurarSubscricaoFormComponent, ConfigurarSubscricaoComponent] ,
  providers: [
    ConfigurarSubscricaoService
],
})
export class ConfigurarSubscricaoModule { }
