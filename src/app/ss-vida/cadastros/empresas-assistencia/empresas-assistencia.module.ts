import { SharedModule } from './../../shared/shared.module';
import { EmpresasAssistenciaRoutingModule } from './routes/empresas-assistencia.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { EmpresasAssistenciaService } from './service/empresas-assistencia.service';
import { EmpresasAssistenciaFormComponent } from './empresas-assistencia-form/empresas-assistencia-form.component';
import { EmpresasAssistenciaDetalheComponent } from './empresas-assistencia-detalhe/empresas-assistencia-detalhe.component';
import { EmpresasAssistenciaComponent } from './empresas-assistencia.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        EmpresasAssistenciaRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        EmpresasAssistenciaComponent,
        EmpresasAssistenciaDetalheComponent,
        EmpresasAssistenciaFormComponent],
        providers: [
            EmpresasAssistenciaService
        ],
})
export class EmpresasAssistenciaModule { }
