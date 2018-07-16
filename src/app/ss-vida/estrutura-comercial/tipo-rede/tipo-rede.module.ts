import { SharedModule } from './../../shared/shared.module';
import { TipoRedeRoutingModule } from './routes/tipo-rede.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { TipoRedeService } from './service/tipo-rede.service';
import { TipoRedeFormComponent } from './tipo-rede-form/tipo-rede-form.component';
import { TipoRedeComponent } from './tipo-rede.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TipoRedeRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        TipoRedeComponent,
        TipoRedeFormComponent],
        providers: [
            TipoRedeService
        ],
})
export class TipoRedeModule { }
