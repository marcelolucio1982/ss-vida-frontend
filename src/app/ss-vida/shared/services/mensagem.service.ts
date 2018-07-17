import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { style } from '@angular/animations/src/animation_metadata';
import { NgStyle } from '@angular/common/src/directives/ng_style';

// Fonte: https://embed.plnkr.co/plunk/oA2Day
@Injectable()
export class MensagemService {
  private timeoutDescarte = 7000; // milisegundos
  private mensagem = new Subject<any>();
  private descarte = new Subject<any>();
  private limpeza = new Subject<any>();
  public mensagemConfirmacaoEmitter = new EventEmitter<boolean>();

  enviarMsgConfirm(msg: string): EventEmitter<boolean> {
    this.enfileirarMensagem(msg, 'confirm');
    const el = document.getElementById('ssv-mensagens');
    el.classList.add('bgFull');
    return this.mensagemConfirmacaoEmitter;
  }

  enviarMensagem(msg: string) {
    this.enfileirarMensagem(msg, 'sucesso');
    const el = document.getElementById('ssv-mensagens');
    el.classList.remove('bgFull');
  }

  enviarAlerta(msg: string) {
    this.enfileirarMensagem(msg, 'alerta');
    const el = document.getElementById('ssv-mensagens');
    el.classList.remove('bgFull');
  }

  enviarErro(msg: string) {
    this.enfileirarMensagem(msg, 'erro');
    const el = document.getElementById('ssv-mensagens');
    el.classList.remove('bgFull');
  }

  limparMensagens() {
    this.limpeza.next();
    const el = document.getElementById('ssv-mensagens');
    el.classList.remove('bgFull');
  }

  private enfileirarMensagem(msg: string, tipo: string) {
    const mensagem = { id: (new Date()).getTime(), tipo: tipo, texto: msg, icon: msg};
    this.mensagem.next(mensagem);
    if (tipo !== 'confirm') {
      setTimeout(() => { this.descartarMensagem(mensagem); }, this.timeoutDescarte);
    }
  }

   descartarMensagem(mensagem: any) {
    this.descarte.next(mensagem);
  }

  limparEvento() {
    this.mensagemConfirmacaoEmitter = null;
    this.mensagemConfirmacaoEmitter = new EventEmitter<boolean>() ;
  }

  getMensagem(): Observable<any> {
    return this.mensagem.asObservable();
  }

  deleteMensagem(): Observable<any> {
    return this.descarte.asObservable();
  }

  descarteTodasMensagens(): Observable<any> {
    return this.limpeza.asObservable();
  }

  emitirEventoMensagemFechada() {
    this.mensagemConfirmacaoEmitter.emit(false);
  }

  emitirEventoMensagemAceita() {
    this.mensagemConfirmacaoEmitter.emit(true);
  }

}
