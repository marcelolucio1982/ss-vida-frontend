import { Component, OnInit } from '@angular/core';
import { FornecedorService } from './servico/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpModule
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigoFornecedor: [null, Validators.required],
      nomeFornecedor: [null, Validators.required],
      razaoSocialFornecedor: [null, Validators.required]
    });

  }

  onSubmit() { }

  cadastrarFornecedor() {
    alert('Cadastrando Fornecedor');
    this.router.navigate(['/fornecedor/novo']);
  }

  pesquisarFornecedor() {
    alert('Cadastrando Fornecedor');
    this.router.navigate(['/fornecedor']);
  }

}
