import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from './../../shared/shared.module';
import { AgrupadorLocalVendaRoutingModule } from './routes/agrupador-local-venda.routing.module';
import { AgrupadorLocalVendaComponent } from './agrupador-local-venda.component';
import { AgrupadorLocalVendaService } from './service/agrupador-local-venda.service';
import { AgrupadorLocalVendaFormComponent } from './agrupador-local-venda-form/agrupador-local-venda-form.component';
import { AgrupadorLocalVendaDetalheComponent } from './agrupador-local-venda-detalhe/agrupador-local-venda-detalhe.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TextMaskModule,
        AgrupadorLocalVendaRoutingModule
    ],
    exports: [],
    declarations: [
        AgrupadorLocalVendaComponent,
        AgrupadorLocalVendaFormComponent,
        AgrupadorLocalVendaDetalheComponent],
        providers: [
            AgrupadorLocalVendaService
        ],
})
export class AgrupadorLocalVendaModule { }
