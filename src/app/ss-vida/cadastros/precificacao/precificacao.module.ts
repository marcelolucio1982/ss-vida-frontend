import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecificacaoComponent } from './precificacao.component';
import { PrecificacaoFormComponent } from './precificacao-form/precificacao-form.component';
import { PrecificacaoRoutingModule } from './routes/precificacao.routing.module';
import { PrecificacaoService } from './service/precificacao.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PrecificacaoRoutingModule
  ],
  declarations: [PrecificacaoFormComponent, PrecificacaoComponent] ,
  providers: [
    PrecificacaoService
],
})
export class PrecificacaoModule { }
