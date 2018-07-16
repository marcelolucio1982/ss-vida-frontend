import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportacaoComponent } from './importacao.component';
import { ImportacaoFormComponent } from './importacao-form/importacao-form.component';
import { ImportacaoRoutingModule } from './routes/importacao.routing.module';
import { ImportacaoService } from './service/importacao.service';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ImportacaoRoutingModule
  ],
  declarations: [ImportacaoFormComponent, ImportacaoComponent] ,
  providers: [
    ImportacaoService
],
})
export class ImportacaoModule { }
