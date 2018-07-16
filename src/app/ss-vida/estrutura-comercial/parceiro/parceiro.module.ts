import { SharedModule } from './../../shared/shared.module';
import { ParceiroRoutingModule } from './routes/parceiro.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { ParceiroService } from './service/parceiro.service';
import { ParceiroFormComponent } from './parceiro-form/parceiro-form.component';
import { ParceiroComponent } from './parceiro.component';
import { AgrupadorParceiroService } from '../agrupador-parceiro/service/agrupador-parceiro.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ParceiroRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        ParceiroComponent,
        ParceiroFormComponent],
        providers: [
            ParceiroService,
            AgrupadorParceiroService
        ],
})
export class ParceiroModule { }
