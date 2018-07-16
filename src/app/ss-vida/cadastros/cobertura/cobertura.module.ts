import { SharedModule } from './../../shared/shared.module';
import { CoberturaGuard } from './routes/guards/cobertura.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './../../home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';

import { CoberturaComponent } from './cobertura.component';
import { CoberturaService } from './service/cobertura.service';
import { CoberturaFormComponent } from './cobertura-form/cobertura-form.component';
import { CoberturaDetalheComponent } from './cobertura-detalhe/cobertura-detalhe.component';
import { CoberturaRoutingModule } from './routes/cobertura.routing.module';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    CoberturaComponent,
    CoberturaFormComponent,
    CoberturaDetalheComponent
  ],
  imports: [
    CommonModule,
    CoberturaRoutingModule,
    SharedModule,
    HttpModule
  ],
  providers: [
    CoberturaService,
    CoberturaGuard
  ]
})
export class CoberturaModule { }
