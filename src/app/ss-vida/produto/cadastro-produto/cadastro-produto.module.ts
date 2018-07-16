import { CadastroProdutoService } from './servico/cadastro-produto.service';
import { CadastroProdutoRoutingModule } from './routes/cadastro-produto.routing.module';
import { SharedModule } from './../../shared/shared.module';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProdutoDetalheComponent } from './cadastro-produto-detalhe/cadastro-produto-detalhe.component';
import { CadastroProdutoFormComponent } from './cadastro-produto-form/cadastro-produto-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CadastroProdutoRoutingModule,
  ],
  declarations: [
    CadastroProdutoComponent,
    CadastroProdutoDetalheComponent,
    CadastroProdutoFormComponent
  ],
  providers: [CadastroProdutoService]
})
export class CadastroProdutoModule { }

