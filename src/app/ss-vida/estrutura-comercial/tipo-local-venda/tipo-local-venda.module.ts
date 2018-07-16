import { SharedModule } from './../../shared/shared.module';
import { TipoLocalVendaRoutingModule } from './routes/tipo-local-venda.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { TipoLocalVendaService } from './service/tipo-local-venda.service';
import { TipoLocalVendaFormComponent } from './tipo-local-venda-form/tipo-local-venda-form.component';
import { TipoLocalVendaComponent } from './tipo-local-venda.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TipoLocalVendaRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        TipoLocalVendaComponent,
        TipoLocalVendaFormComponent],
        providers: [
            TipoLocalVendaService
        ],
})
export class TipoLocalVendaModule { }
