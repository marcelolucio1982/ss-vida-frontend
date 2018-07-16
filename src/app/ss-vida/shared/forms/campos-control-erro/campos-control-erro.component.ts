import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campos-control-erro',
  templateUrl: './campos-control-erro.component.html',
  styleUrls: ['./campos-control-erro.component.scss']
})
export class CamposControlErroComponent implements OnInit {

  constructor() { }

  @Input() msgErro: string;
  @Input() mostrarErro: boolean;

  ngOnInit() {

  }

}
