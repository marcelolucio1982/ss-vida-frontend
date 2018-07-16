import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';
import { MensagemService } from '../../shared/services/mensagem.service';
import { ApoliceService } from '../service/apolice.service';

@Component({
  selector: 'app-endosso',
  templateUrl: './endosso.component.html',
  styleUrls: ['./endosso.component.scss']
})
export class EndossoComponent implements OnInit {

  public numeroApolice;
  public endossosList: any;
  public endossoPendente = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService,
    public constantesService: ConstantesService,
    public utilService: UtilService,
    private apoliceService: ApoliceService,
  ) { }

  ngOnInit() {
    this.endossoPendente = false;
    this.route.parent.params.subscribe( params => {
      this.numeroApolice = params[ 'id' ];
      this.apoliceService.findEndossos( this.numeroApolice ).subscribe( res => {
        this.endossosList = res['data'];
        for ( const endosso of this.endossosList ) {
          if ( endosso.situacao.descricao === 'PENDENTE' ) {
            this.endossoPendente = true;
            break;
          }
        }
      });
    });
  }

  public removerEndosso() {

    this.mensagemService.enviarMsgConfirm('Deseja realmente remover esse registro?').subscribe( result => {
      if (result) {

        this.apoliceService.deleteEndosso( this.numeroApolice ).subscribe( res => {
          this.mensagemService.enviarMensagem('Exclusão realizada com sucesso!');
          this.ngOnInit();
        });
       }
     });

  }

}
