import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'APP EXAMPLE';
  retorno: any = {};
  variaveis = environment;

  constructor(private http: Http) {
  }

  ngOnInit() {
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

}
