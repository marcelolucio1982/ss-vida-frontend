import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoProdutoService } from './../../servico/configuracao-produto.service';
import { Component, OnInit } from '@angular/core';

import { ConstantesService } from './../../../../shared/services/constantes.service';
import { CadastroProdutoService } from './../../../cadastro-produto/servico/cadastro-produto.service';
import { MensagemService } from './../../../../shared/services/mensagem.service';
import { UtilService } from './../../../../shared/services/util.service';

@Component({
  selector: 'app-configuracao-dashboard',
  templateUrl: './configuracao-dashboard.component.html',
  styleUrls: ['./configuracao-dashboard.component.scss']
})
export class ConfiguracaoDashboardComponent implements OnInit {

  exibeResumo: boolean;
  exibeImportacao: boolean;
  exibeSubscricao: boolean;
  exibeCobranca: boolean;
  exibeComissao: boolean;
  exibePrecificacao: boolean;
  exibeAcoplados: boolean;
  exibeAssistencias: boolean;
  exibeCoberturas: boolean;
  exibeDadosGerais: boolean;

  constructor(
    private configuracaoProdutoService: ConfiguracaoProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public utilService: UtilService,
    private mensagemService: MensagemService,
    private produtoService: CadastroProdutoService,
    public constantesService: ConstantesService,
  ) { }

  ngOnInit() {
  }

}
