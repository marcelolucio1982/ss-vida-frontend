import { FornecedorService } from './servico/fornecedor.service';
import { FornecedorRoutingModule } from './routes/fornecedor.routing.module';
import { SharedModule } from './../../shared/shared.module';
import { FornecedorComponent } from './fornecedor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedorDetalheComponent } from './fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FornecedorRoutingModule
  ],
  declarations: [
    FornecedorComponent,
    FornecedorDetalheComponent,
    FornecedorFormComponent
  ],
  providers: [FornecedorService]
})
export class FornecedorModule { }
