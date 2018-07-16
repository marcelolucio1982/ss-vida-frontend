import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from './../shared/shared.module';
import { ApoliceService } from './service/apolice.service';
import { ApoliceComponent } from './apolice.component';
import { ApoliceFormComponent } from './apolice-form/apolice-form.component';
import { ApoliceRoutingModule } from './routes/apolice.routing.module';
import { ApoliceDetalheComponent } from './apolice-detalhe/apolice-detalhe.component';
import { CobrancaDevolucaoComponent } from './apolice-detalhe/cobranca-devolucao/cobranca-devolucao.component';
import { DadosApoliceComponent } from './apolice-detalhe/dados-apolice/dados-apolice.component';
import { DetalheCobrancaComponent } from './apolice-detalhe/detalhe-cobranca/detalhe-cobranca.component';
import { DetalheDevolucaoComponent } from './apolice-detalhe/detalhe-devolucao/detalhe-devolucao.component';
import { ComunicacaoVendaPosVendaComponent } from './apolice-detalhe/comunicacao-venda-posvenda/comunicacao-venda-posvenda.component';
import { ComissaoComponent } from './apolice-detalhe/comissao/comissao.component';
import { EndossoComponent } from './endosso/endosso.component';
import { EndossoCadastrarComponent } from './endosso/endosso-cadastrar/endosso-cadastrar.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ApoliceRoutingModule,
        TextMaskModule],
    exports: [],
    declarations: [
      ApoliceComponent,
      ApoliceDetalheComponent,
      ApoliceFormComponent,
      CobrancaDevolucaoComponent,
      DadosApoliceComponent,
      DetalheCobrancaComponent,
      DetalheDevolucaoComponent,
      ComunicacaoVendaPosVendaComponent,
      ComissaoComponent,
      EndossoComponent,
      EndossoCadastrarComponent
    ],
    providers: [ApoliceService],
})

export class ApoliceModule { }
