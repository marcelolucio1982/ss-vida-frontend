import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from './../shared/shared.module';
import { EndossoService } from './service/endosso.service';
import { EndossoComponent } from './endosso.component';
import { EndossoRoutingModule } from './routes/endosso.routing.module';
import { EndossoFormComponent } from './endosso-form/endosso-form.component';
import { EndossoDetalheComponent } from './endosso-detalhe/endosso-detalhe.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        EndossoRoutingModule,
        TextMaskModule],
    exports: [],
    declarations: [
      EndossoComponent,
      EndossoFormComponent,
      EndossoDetalheComponent
    ],
    providers: [EndossoService]
})
export class EndossoModule { }
