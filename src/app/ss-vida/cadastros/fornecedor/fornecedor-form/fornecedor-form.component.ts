import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FornecedorService } from '../servico/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

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
      razaoSocialFornecedor: [null, Validators.required],
      cnpjFornecedor: [null, Validators.required],
      contatoFornecedorCaixa: [null, Validators.required],
      contatoFornecedorCliente: [null, Validators.required],
      dataInicioVigencia: [null, Validators.required],
      dataFimVigencia: [null, Validators.required]
    });
  }

  onSubmit() { }

  cadastrarFornecedor() {
    this.router.navigate(['/fornecedor/novo']);
  }

  pesquisarFornecedor() {
    this.router.navigate(['/fornecedor']);
  }


}
