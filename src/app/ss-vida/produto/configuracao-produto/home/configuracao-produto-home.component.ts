import { ConfiguracaoProdutoService } from './../servico/configuracao-produto.service';
import { UtilService } from './../../../shared/services/util.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { element, by } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-configuracao-produto-home',
  templateUrl: './configuracao-produto-home.component.html',
  styleUrls: ['./configuracao-produto-home.component.scss']
})
export class ConfiguracaoProdutoHomeComponent implements OnInit {

  public produtoDetalhe: any;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    public utilService: UtilService,
    private configuracaoProdutoService: ConfiguracaoProdutoService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => {
      const codigo = +params[ 'id' ];
      const versao = +params[ 'versao' ];
      this.configuracaoProdutoService.get( { produto: { 'codigo': codigo, 'versao': versao } } ).subscribe( res => {
        this.produtoDetalhe = res[ 'data' ];
      });
    });
}

}
