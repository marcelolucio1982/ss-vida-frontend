import { TestBed, async } from '@angular/core/testing';

import { SharedModule } from './ss-vida/shared/shared.module';
import { FornecedorModule } from './ss-vida/cadastros/fornecedor/fornecedor.module';
import { CustoModule } from './ss-vida/cadastros/custo/custo.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './ss-vida/routes/app.routing.module';
import { AuthGuard } from './ss-vida/routes/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { Class } from '@angular/core';

import { CarregamentoModule } from './ss-vida/cadastros/carregamento/carregamento.module';
import { ImportacaoModule } from './ss-vida/cadastros/importacao/importacao.module';
import { AssistenciaModule } from './ss-vida/cadastros/assistencia/assistencia.module';
import { LocalVendaModule } from './ss-vida/estrutura-comercial/local-venda/local-venda.module';
import { CoberturaModule } from './ss-vida/cadastros/cobertura/cobertura.module';
import { LoginModule } from './ss-vida/login/login.module';
import { PropostaModule } from './ss-vida/proposta/proposta.module';
import { ApoliceModule } from './ss-vida/apolice/apolice.module';
import { ProdutoModule } from './ss-vida/produto/produto.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ss-vida/login/login.component';
import { HomeModule } from './ss-vida/home/home.module';
import { LoginService } from './ss-vida/login/service/login.service';
import { ErrorModule } from './ss-vida/error/error.module';
import { MensagemService } from './ss-vida/shared/services/mensagem.service';
import { LoaderService } from './ss-vida/shared/services/loader.service';
import { EmpresasAssistenciaModule } from './ss-vida/cadastros/empresas-assistencia/empresas-assistencia.module';
import { CadastroProdutoModule } from './ss-vida/produto/cadastro-produto/cadastro-produto.module';
import { LoaderComponent } from './ss-vida/loader/loader.component';
import { HistoricoModule } from './ss-vida/historico/historico.module';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoaderComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterializeModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ErrorModule,
        LoginModule,
        HomeModule,
        ProdutoModule,
        PropostaModule,
        ApoliceModule,
        AssistenciaModule,
        CoberturaModule,
        ImportacaoModule,
        CarregamentoModule,
        FornecedorModule,
        CustoModule,
        SharedModule,
        EmpresasAssistenciaModule,
        CadastroProdutoModule,
        HistoricoModule
      ],
      providers: [
        AuthGuard,
        LoginService,
        MensagemService,
        LoaderService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
