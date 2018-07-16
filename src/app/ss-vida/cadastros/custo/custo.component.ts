import { CustoService } from './service/custo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../login/service/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custo',
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.scss']
})
export class CustoComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private CustoService: CustoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required]
    });
  }

  custo () {
    alert('OK');
  }

  editarCusto() {
    this.router.navigate(['/custo', 1, 'editar']);
  }

  cadastrarCusto() {
    this.router.navigate(['/custo/novo']);
  }

  pesquisarCusto() {
    this.router.navigate(['/custo', 2]);
  }

}
