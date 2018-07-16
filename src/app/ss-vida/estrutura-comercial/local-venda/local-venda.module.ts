import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from './../../shared/shared.module';
import { LocalVendaService } from './service/local-venda.service';
import { LocalVendaFormComponent } from './local-venda-form/local-venda-form.component';
import { LocalVendaComponent } from './local-venda.component';
import { TipoLocalVendaModule } from '../tipo-local-venda/tipo-local-venda.module';
import { TipoRedeModule } from './../tipo-rede/tipo-rede.module';
import { TipoRelacionamentoModule } from './../tipo-relacionamento/tipo-relacionamento.module';
import { ParceiroModule } from './../parceiro/parceiro.module';
import { LocalVendaRoutingModule } from './routes/local-venda.routing.module';
import { LocalVendaDetalheComponent } from './local-venda-detalhe/local-venda-detalhe.component';
import { AgrupadorLocalVendaModule } from './../agrupador-local-venda/agrupador-local-venda.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LocalVendaRoutingModule,
        TextMaskModule,
        TipoLocalVendaModule,
        TipoRedeModule,
        TipoRelacionamentoModule,
        ParceiroModule,
        AgrupadorLocalVendaModule
    ],
    exports: [],
    declarations: [
        LocalVendaComponent,
        LocalVendaFormComponent,
        LocalVendaDetalheComponent],
        providers: [
            LocalVendaService
        ],
})
export class LocalVendaModule { }
