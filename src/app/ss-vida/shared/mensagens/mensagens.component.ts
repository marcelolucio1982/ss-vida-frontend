import { MensagemService } from './../services/mensagem.service';
import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss']
})
export class MensagensComponent implements OnInit, OnDestroy {
  modalActions1: any;

  title = 'app';
  exibirMenu: Boolean = false;
  mensagens: any;
  subscriptionReceberMensagemService: Subscription;
  subscriptionDescartarMensagemService: Subscription;
  subscriptionDescartarMensagensService: Subscription;

  constructor(private mensagemService: MensagemService) {
    this.subscriptionReceberMensagemService = this.mensagemService.getMensagem().subscribe(mensagem => {
      this.mensagens.push(mensagem);
    });

    this.subscriptionDescartarMensagemService = this.mensagemService.deleteMensagem().subscribe(mensagem => {
      this.fecharMensagem(mensagem);
    });

    this.subscriptionDescartarMensagemService = this.mensagemService.descarteTodasMensagens().subscribe(() => {
      this.mensagens = [];
    });
  }

  ngOnDestroy() {
    this.subscriptionReceberMensagemService.unsubscribe();
    this.subscriptionDescartarMensagemService.unsubscribe();
    this.subscriptionDescartarMensagensService.unsubscribe();
    this.mensagemService.limparEvento();
  }

  ngOnInit() {
      this.mensagens = [];
  }

  openModal1() {
    alert('abrindo');
  }

  openConfirm() {
    alert('me chamou?');
    // window.setTimeout(() => this, 5000);
  }


  fecharMensagem(mensagem: any) {
    this.mensagens = this.mensagens.filter(function(e, i) {
        return e.id !== mensagem.id;
    });
    if (mensagem.tipo === 'confirm') {
      this.mensagemService.emitirEventoMensagemFechada();
      this.mensagemService.limparEvento();
    }
  }

  aceitarMensagem(mensagem: any) {
    this.mensagens = this.mensagens.filter(function(e, i) {
      return e.id !== mensagem.id;
    });
    if (mensagem.tipo === 'confirm') {
      this.mensagemService.emitirEventoMensagemAceita();
      this.mensagemService.limparEvento();
    }
  }

}

