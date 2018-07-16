import { HttpService } from './services/http.service';
import { LogService } from './../shared/services/log.service';
import { BrowserModule } from '@angular/platform-browser';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamposControlErroComponent } from './forms/campos-control-erro/campos-control-erro.component';
import { FormDebugComponent } from './forms/form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CamposControlSuccessComponent } from './forms/campos-control-success/campos-control-success.component';
import { CamposControlWarningComponent } from './forms/campos-control-warning/campos-control-warning.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { ConstantesService } from './services/constantes.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { UtilService } from './services/util.service';
import { TextMaskModule } from 'angular2-text-mask';
import { PaginationComponent } from './../pagination/pagination.component';
import { PropostaHeaderComponent } from '../proposta/proposta-header/proposta-header.component';
import { CepPipe } from './pipe/cep.pipe';
import { CnpjPipe } from './pipe/cnpj-pipe';
import { CpfPipe } from './pipe/cpf-pipe';
import { TelPipe } from './pipe/tel.pipe';
import { ValorPipe } from './pipe/valor.pipe';
import { ValorRealPipe } from './pipe/valorReal.pipe';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    TextMaskModule
  ],
  declarations: [
    FormDebugComponent,
    CamposControlErroComponent,
    CamposControlSuccessComponent,
    CamposControlWarningComponent,
    MensagensComponent,
    PaginationComponent,
    PropostaHeaderComponent,
    CepPipe,
    CnpjPipe,
    TelPipe,
    ValorPipe,
    ValorRealPipe,
    CpfPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormDebugComponent,
    MaterializeModule,
    CamposControlErroComponent,
    PropostaHeaderComponent,
    MensagensComponent,
    PaginationComponent,
    TextMaskModule,
    CepPipe,
    CnpjPipe,
    TelPipe,
    ValorPipe,
    ValorRealPipe,
    CpfPipe
  ],
  providers: [
    LogService,
    HttpService,
    ConstantesService,
    UtilService,
    CanDeactivateGuard
  ]
})
export class SharedModule { }
