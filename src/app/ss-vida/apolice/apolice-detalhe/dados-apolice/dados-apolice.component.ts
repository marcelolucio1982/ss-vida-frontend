import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApoliceService } from './../../service/apolice.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-dados-apolice',
  templateUrl: './dados-apolice.component.html',
  styleUrls: ['./dados-apolice.component.scss']
})
export class DadosApoliceComponent implements OnInit {

  public apolice: any;
  public proposta: any;

  constructor(
    private route: ActivatedRoute,
    public utilService: UtilService,
    private apoliceService: ApoliceService,
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe( params => {
      const codigo = params[ 'id' ];
      this.apoliceService.get( codigo ).subscribe( res => {
        this.apolice = res;
        this.apoliceService.getProposta( this.apolice.endosso.proposta.numeroPropostaExterna ).subscribe( res2 => {
          this.proposta = res2;
        });
      });
    });
  }

}
