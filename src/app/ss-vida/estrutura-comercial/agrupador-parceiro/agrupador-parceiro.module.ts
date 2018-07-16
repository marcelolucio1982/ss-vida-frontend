import { SharedModule } from './../../shared/shared.module';
import { AgrupadorParceiroRoutingModule } from './routes/agrupador-parceiro.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { AgrupadorParceiroService } from './service/agrupador-parceiro.service';
import { AgrupadorParceiroFormComponent } from './agrupador-parceiro-form/agrupador-parceiro-form.component';
import { AgrupadorParceiroComponent } from './agrupador-parceiro.component';
import { AgrupadorParceiroDetalheComponent } from './agrupador-parceiro-detalhe/agrupador-parceiro-detalhe.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AgrupadorParceiroRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        AgrupadorParceiroComponent,
        AgrupadorParceiroFormComponent,
        AgrupadorParceiroDetalheComponent],
        providers: [
            AgrupadorParceiroService
        ],
})
export class AgrupadorParceiroModule { }
