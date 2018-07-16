import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from './../shared/shared.module';
import { PropostaService } from './service/proposta.service';
import { PropostaComponent } from './proposta.component';
import { PropostaRoutingModule } from './routes/proposta.routing.module';
import { PropostaDetalheComponent } from './proposta-detalhe/proposta-detalhe.component';
import { PropostaDeclinioComponent } from './proposta-declinio/proposta-declinio.component';
import { NovaContaComponent } from './nova-conta/nova-conta.component';
import { PropostaFormComponent } from './proposta-form/proposta-form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PropostaRoutingModule,
        TextMaskModule],
    exports: [],
    declarations: [
      PropostaComponent,
      PropostaDetalheComponent,
      PropostaDeclinioComponent,
      NovaContaComponent,
      PropostaFormComponent
    ],
    providers: [PropostaService],
})

export class PropostaModule { }
