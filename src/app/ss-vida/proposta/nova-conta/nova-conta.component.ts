import { ConstantesService } from './../../shared/services/constantes.service';
import { UtilService } from './../../shared/services/util.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-nova-conta',
  templateUrl: './nova-conta.component.html'
})
export class NovaContaComponent {
  exibeFormNovaConta: boolean;

  @Input()
  public novaContaForm: FormGroup;

  @Input()
  public contasDevolucao: any;

  exibeOperacoesCaixa = false;

  constructor(
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  selectNovoBanco(banco) {
    if ( banco ) {
      this.exibeOperacoesCaixa = false;
      this.novaContaForm.controls['novaOperacao'].disable();
      const bancoSelected = this.novaContaForm.get('novoBanco').value;
      if (bancoSelected.codigo === 104 ) {
        this.exibeOperacoesCaixa = true;
        this.novaContaForm.controls['novaOperacao'].enable();
      }
    }
  }

  incluirConta() {

    if (this.novaContaForm.valid) {

      const novoBanco = this.novaContaForm.get('novoBanco').value;
      const novaOperacao = this.novaContaForm.get('novaOperacao').value;
      const novaAgencia = this.novaContaForm.get('novaAgencia').value;
      const novoDvAgencia = this.novaContaForm.get('novoDvAgencia').value;
      const novaConta = this.novaContaForm.get('novaConta').value;
      const novoDvConta = this.novaContaForm.get('novoDvConta').value;

      const conta = {
        codigoBanco: novoBanco.codigo,
        nomeBanco: novoBanco.nome,
        dvBanco: novoBanco.dvBanco,
        codigoAgencia: novaAgencia,
        dvAgencia: novoDvAgencia,
        numeroConta: novaConta,
        dvConta: novoDvConta,
        codigoOperacaoCEF: { codigo: (novaOperacao && novaOperacao.codigo) ? novaOperacao.codigo : 0 }
      };

      this.contasDevolucao.push(conta);
      this.novaContaForm.get('novoBanco').setValue(null);
      this.novaContaForm.get('novaOperacao').setValue(null);
      this.novaContaForm.get('novaAgencia').setValue('');
      this.novaContaForm.get('novoDvAgencia').setValue('');
      this.novaContaForm.get('novaConta').setValue('');
      this.novaContaForm.get('novoDvConta').setValue('');
    } else {
      this.utilService.validateAllFormFields(this.novaContaForm);
    }

  }
}
