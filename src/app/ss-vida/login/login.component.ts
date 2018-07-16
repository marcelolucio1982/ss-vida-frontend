import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './dominio/usuario';
import { LoginService } from './service/login.service';
import { UtilService } from '../shared/services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor (
    private router: Router,
    private loginService: LoginService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
     this.usuario.username = 'ter76175';
     this.usuario.password = 'ssvida11';
  }

 fazerLogin() {
    this.loginService.fazerLogin( this.usuario ).subscribe( res => {
      this.usuario = res;
      this.loginService.getPermissoes().subscribe( res2 => {
        this.usuario.permissoes = res2;
        this.loginService.setUsuario( this.usuario );
        this.router.navigate(['/home-page']);
        this.loginService.mostrarMenu();
      });
    });
  }
}
