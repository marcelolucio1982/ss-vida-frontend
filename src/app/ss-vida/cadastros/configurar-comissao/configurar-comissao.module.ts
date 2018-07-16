import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurarComissaoComponent } from './configurar-comissao.component';
import { ConfigurarComissaoFormComponent } from './configurar-comissao-form/configurar-comissao-form.component';
import { ConfigurarComissaoRoutingModule } from './routes/configurar-comissao.routing.module';
import { ConfigurarComissaoService } from './service/configurar-comissao.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurarComissaoRoutingModule
  ],
  declarations: [ConfigurarComissaoFormComponent, ConfigurarComissaoComponent] ,
  providers: [
    ConfigurarComissaoService
],
})
export class ConfigurarComissaoModule { }
