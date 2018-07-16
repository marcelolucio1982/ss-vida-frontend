import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { ParceiroService } from '../../estrutura-comercial/parceiro/service/parceiro.service';
import { TipoLocalVendaService } from './../../estrutura-comercial/tipo-local-venda/service/tipo-local-venda.service';
import { ConfiguracaoProdutoRoutingModule } from './routes/configuracao-produto.routing.module';
import { ConfiguracaoProdutoService } from './servico/configuracao-produto.service';

import { ConfiguracaoProdutoComponent } from './configuracao-produto.component';
import { ConfiguracaoProdutoHomeComponent } from './home/configuracao-produto-home.component';
import { ProdutoHeaderComponent } from './../produto-header/produto-header.component';
import { ConfiguracaoCoberturaComponent } from './configuracao-cobertura/configuracao-cobertura.component';
import { ConfiguracaoPrecificacaoComponent } from './configuracao-precificacao/configuracao-precificacao.component';
import { ConfiguracaoDadosGeraisComponent } from './home/dados-gerais/configuracao-dados-gerais.component';
import { ConfiguracaoAssistenciasComponent } from './configuracao-assistencias/configuracao-assistencias.component';
import { ConfiguracaoAcopladosComponent } from './configuracao-acoplados/configuracao-acoplados.component';
import { ConfiguracaoComissaoComponent } from './configuracao-comissao/configuracao-comissao.component';
import { ConfiguracaoCobrancaComponent } from './configuracao-cobranca/configuracao-cobranca.component';
import { ConfiguracaoSubscricaoComponent } from './configuracao-subscricao/configuracao-subscricao.component';
import { ConfiguracaoImportacaoComponent } from './configuracao-importacao/configuracao-importacao.component';
import { PeriodicidadePagamentosComponent } from './home/dados-gerais/periodicidade/periodicidade-pagamentos.component';
import { PermissoesVendaComponent } from './home/dados-gerais/permissoes-venda/permissoes-venda.component';
import { ConfiguracaoVisualizacaoComponent } from './home/visualizacao/configuracao-visualizacao.component';
import { ConfiguracaoDashboardComponent } from './home/dashboard/configuracao-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfiguracaoProdutoRoutingModule,
  ],
  declarations: [
    ProdutoHeaderComponent,
    ConfiguracaoProdutoHomeComponent,
    ConfiguracaoProdutoComponent,
    ConfiguracaoCoberturaComponent,
    ConfiguracaoPrecificacaoComponent,
    ConfiguracaoDadosGeraisComponent,
    ConfiguracaoAssistenciasComponent,
    ConfiguracaoAcopladosComponent,
    ConfiguracaoComissaoComponent,
    ConfiguracaoCobrancaComponent,
    ConfiguracaoSubscricaoComponent,
    ConfiguracaoImportacaoComponent,
    PeriodicidadePagamentosComponent,
    PermissoesVendaComponent,
    ConfiguracaoVisualizacaoComponent,
    ConfiguracaoDashboardComponent
  ],
  providers: [ConfiguracaoProdutoService, ParceiroService, TipoLocalVendaService]
})
export class ConfiguracaoProdutoModule { }

