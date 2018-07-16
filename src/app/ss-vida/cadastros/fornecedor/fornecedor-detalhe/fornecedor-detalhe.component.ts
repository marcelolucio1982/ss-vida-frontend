import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html',
  styleUrls: ['./fornecedor-detalhe.component.scss']
})
export class FornecedorDetalheComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit() { }

  onSubmit() { }

  cadastrarAssistencia() { }

}
