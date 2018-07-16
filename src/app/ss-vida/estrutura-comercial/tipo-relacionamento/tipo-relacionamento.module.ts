import { SharedModule } from './../../shared/shared.module';
import { TipoRelacionamentoRoutingModule } from './routes/tipo-relacionamento.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { TipoRelacionamentoService } from './service/tipo-relacionamento.service';
import { TipoRelacionamentoFormComponent } from './tipo-relacionamento-form/tipo-relacionamento-form.component';
import { TipoRelacionamentoComponent } from './tipo-relacionamento.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TipoRelacionamentoRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        TipoRelacionamentoComponent,
        TipoRelacionamentoFormComponent],
        providers: [
            TipoRelacionamentoService
        ],
})
export class TipoRelacionamentoModule { }
