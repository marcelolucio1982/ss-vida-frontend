import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { ComissionadoRoutingModule } from './routes/comissionado.routing.module';
import { ComissionadoComponent } from './comissionado.component';
import { ComissionadoService } from './service/comissionado.service';
import { ComissionadoFormComponent } from './comissionado-form/comissionado-form.component';
import { ComissionadoDetalheComponent } from './comissionado-detalhe/comissionado-detalhe.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ComissionadoRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        ComissionadoComponent,
        ComissionadoFormComponent,
        ComissionadoDetalheComponent],
        providers: [
            ComissionadoService
        ],
})
export class ComissionadoModule { }
