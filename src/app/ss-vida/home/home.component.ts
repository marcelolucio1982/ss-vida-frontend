import { Component, OnInit } from '@angular/core';
import { MensagemService } from './../shared/services/mensagem.service';
import {MaterializeDirective} from "angular2-materialize";
import * as $ from 'jquery'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modalActions1: any;
  aceitouMensagem = false;

  constructor(private mensagemService: MensagemService) { }

  ngOnInit() {
    $('h2.accordion').click(function(){
      $(this).parent().find('div.accordion').slideToggle('slow');
    });
    
   $( '#loading' ).delay( 4200 ).fadeOut( 10 );


   /* ############ Fim do Calendário ############# */
  }

  msgConfirm() {
    this.mensagemService.enviarMsgConfirm('Tem certeza que deseja continuar?!');
    this.registrarEscutaMensagemConfirmacao();
  }

  resultadoMsgConfirm() {
    this.mensagemService.enviarMensagem('Resultado:' + this.aceitouMensagem);
  }

  registrarEscutaMensagemConfirmacao() {
    const sub = this.mensagemService.mensagemConfirmacaoEmitter.subscribe(
       mensagem =>  {
         this.aceitouMensagem = mensagem;
         if (this.aceitouMensagem) {
           this.mensagemService.enviarMensagem('Usuário confir!');
         } else {
          this.mensagemService.enviarAlerta('Usuário desistiu!');
         }

        // sub.unsubscribe();
       }
     );
   }

  testarSucesso() {
    this.mensagemService.enviarMensagem('Teste de mensagem de sucesso!');
  }

  testarAlerta() {
    this.mensagemService.enviarAlerta('Teste de mensagem de alerta!');
  }

  testarErro() {
    this.mensagemService.enviarErro('Teste de mensagem de erro!');
  }

  testarLimpeza() {
    this.mensagemService.limparMensagens();
  }

}
