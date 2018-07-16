import { SharedModule } from './../../shared/shared.module';
import { AssistenciaRoutingModule } from './routes/assistencia.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { AssistenciaService } from './service/assistencia.service';
import { AssistenciaFormComponent } from './assistencia-form/assistencia-form.component';
import { AssistenciaComponent } from './assistencia.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AssistenciaRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        AssistenciaComponent,
        AssistenciaFormComponent],
        providers: [
            AssistenciaService
        ],
})
export class AssistenciaModule { }
