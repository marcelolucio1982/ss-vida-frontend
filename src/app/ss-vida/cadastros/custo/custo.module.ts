import { CustoService } from './service/custo.service';
import { CustoDetalheComponent } from './custo-detalhe/custo-detalhe.component';
import { CustoFormComponent } from './custo-form/custo-form.component';
import { CustoComponent } from './custo.component';
import { CustoRoutingModule } from './routes/custo.routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CustoComponent,
        CustoFormComponent,
        CustoDetalheComponent
    ],
    imports: [
        CommonModule,
        CustoRoutingModule,
        SharedModule,
    ],
    providers: [
        CustoService
    ],
})
export class CustoModule {
}
