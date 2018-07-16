import { SharedModule } from './../../shared/shared.module';
import { TipoVendedorRoutingModule } from './routes/tipo-vendedor.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { TipoVendedorService } from './service/tipo-vendedor.service';
import { TipoVendedorFormComponent } from './tipo-vendedor-form/tipo-vendedor-form.component';
import { TipoVendedorComponent } from './tipo-vendedor.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TipoVendedorRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        TipoVendedorComponent,
        TipoVendedorFormComponent],
        providers: [
            TipoVendedorService
        ],
})
export class TipoVendedorModule { }
