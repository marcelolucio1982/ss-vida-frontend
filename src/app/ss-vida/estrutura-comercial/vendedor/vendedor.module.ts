import { SharedModule } from './../../shared/shared.module';
import { VendedorRoutingModule } from './routes/vendedor.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { VendedorService } from './service/vendedor.service';
import { VendedorFormComponent } from './vendedor-form/vendedor-form.component';
import { VendedorComponent } from './vendedor.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        VendedorRoutingModule,
        TextMaskModule
    ],
    exports: [],
    declarations: [
        VendedorComponent,
        VendedorFormComponent],
        providers: [
            VendedorService
        ],
})
export class VendedorModule { }
