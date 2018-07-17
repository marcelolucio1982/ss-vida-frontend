import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './ss-vida/login/service/login.service';
import * as $ from 'jquery';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  exibirMenu: Boolean = false;
  retorno: any = {};
  variaveis = environment;
  // value: string = require('https://ssvidadev.caixaseguradora.intranet/rest/comum/properties/ssvida.version').value;

  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0900';

  constructor (
    private router: Router,
    private http: Http,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.exibirMenuEmitter.subscribe(
      mostrar => this.exibirMenu = mostrar
    );

    this.http.get('./variaveis.json')
      .subscribe(data => {

        this.retorno = data.json();

        environment.production = this.retorno.producao;
        environment.backend = this.retorno.backend;
        environment.ambiente = this.retorno.ambiente;

      }, error => console.log(error));

      this.http.get('./package.json')
      .subscribe(data => {

        this.retorno = data.json();

        environment.versao = this.retorno.version;

      }, error => console.log(error));
  }

  onSubmit() { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  modalProgramas() {
    $('.option-box').css('display', 'block');
  }

  menuHamburguer() {
    $('.side-nav').animate({
      left: '-300px',
    });
    $('.mainContent').animate({ 'margin-left': 20 }, 'slow');
    $('.mainContent').animate({
      left: '-1px',
    });
    $('.side-hamburguer').animate({
      left: '-352px',
    });
    $('.breadcrumb-effect').animate({
      left: '-350px',
    });
    $('.hamburguer').css('display', 'none');
    $('.hamburguer-responsive').css('display', 'block');
    $('.mainContent').css('margin-left', '20px');
    $( '.hamburguer' ).addClass( 'inResponsive');
    $( '.hamburguer-responsive' ).addClass( 'inResponsive');
  }

  OnHamburguer() {
    $('.mainContent').animate({ 'margin-left': 316 }, 'slow');
    $('.side-nav').animate({
      left: '1px',
    });
    $('.side-hamburguer').animate({
      left: '1px',
    });
    $('.breadcrumb-effect').animate({
      left: '1px',
    });
    $('.hamburguer-responsive').css('display', 'none');
    $('.hamburguer').css('display', 'block');
    $('.mainContent').css('margin-left', '316px');
    $( 'div' ).removeClass( 'inResponsive');
  }

  ativaResponsivo() {
    $('.menuDesativaResponsivo').css('display', 'block');
    $('.side-nav.fixed').animate({ 'margin-left': 316 }, 'slow');
    $('.menuAtivaResponsivo').css('display', 'none');
  }

  desativaResponsivo() {
    $('.menuAtivaResponsivo').css('display', 'block');
    $('.side-nav.fixed').animate({ 'margin-left': -316 }, 'slow');
    $('.menuDesativaResponsivo').css('display', 'none');
  }

  responsiveFloatMenu() {
  alert('Ativando o menu no estado responsivo');
  }

  rest() {

  }
}
















