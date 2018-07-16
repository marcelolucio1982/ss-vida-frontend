import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoberturaService } from './../service/cobertura.service';
import { ConstantesService } from './../../../shared/services/constantes.service';
import { MensagemService } from './../../../shared/services/mensagem.service';
import { UtilService } from './../../../shared/services/util.service';


@Component({
  selector: 'app-cobertura-form',
  templateUrl: './cobertura-form.component.html',
  styleUrls: ['./cobertura-form.component.css']
})
export class CoberturaFormComponent implements OnInit, OnDestroy {

  private pathSub: any;
  formulario: FormGroup;
  versoes = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coberturaService: CoberturaService,
    private mensagemService: MensagemService,
    public utilService: UtilService,
    public constantesService: ConstantesService
  ) { }

  ngOnInit() {
    this.configurarFormulario({'versao': 0});

    this.pathSub = this.route.params.subscribe(params => {
      const codigo = +params['id'];
      const versao = +params['versao'];

      if (codigo && versao) {
        this.coberturaService.get({'codigo': codigo, 'versao': versao}).subscribe(res => {
          this.configurarFormulario(res);
        });

        this.coberturaService.getVersoes({'codigo': codigo}).subscribe(res => {
          this.versoes = res;
        });
      }
    });
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  private configurarFormulario(cobertura) {
    if (this.formulario) {
      this.formulario.patchValue({
        dataInicioVigencia: cobertura.dataInicioVigencia,
        codigo: cobertura.codigo,
        descricao: cobertura.descricao,
        sigla: cobertura.sigla,
        nomeImpressao: cobertura.nomeImpressao,
        tipoSegurado: this.constantesService.getTipoSegurado(cobertura.tipoSegurado),
        tipoBeneficiario: this.constantesService.getTipoBeneficiario(cobertura.tipoBeneficiario),
        indicadorDataDiagnostico: this.constantesService.getValorSimNao(cobertura.indicadorDataDiagnostico),
        indicadorCalculoIndenizacao: this.constantesService.getValorSimNao(cobertura.indicadorCalculoIndenizacao),
        descricaoGarantia: cobertura.descricaoGarantia,
        versao: cobertura.versao
      });
    } else {
      this.formulario = this.formBuilder.group({
        dataInicioVigencia: [cobertura.dataInicioVigencia, Validators.required],
        codigo: [cobertura.codigo, null],
        descricao: [cobertura.descricao, Validators.required],
        sigla: [cobertura.sigla, null],
        nomeImpressao: [cobertura.nomeImpressao, null],
        tipoSegurado: [this.constantesService.getTipoSegurado(cobertura.tipoSegurado), Validators.required],
        tipoBeneficiario: [this.constantesService.getTipoBeneficiario(cobertura.tipoBeneficiario), Validators.required],
        indicadorDataDiagnostico: [this.constantesService.getValorSimNao(cobertura.indicadorDataDiagnostico), Validators.required],
        indicadorCalculoIndenizacao: [this.constantesService.getValorSimNao(cobertura.indicadorCalculoIndenizacao), Validators.required],
        descricaoGarantia: [cobertura.sigla, Validators.required],
        versao: [cobertura.versao]
      });

      this.utilService.configurarInputData(this.formulario, 'dataInicioVigencia');
    }

    this.utilService.updateMaterializeTextFields();
  }

  getEhNovaVersao() {
    return this.route.routeConfig.path === ':id/versoes/:versao/novo';
  }

  bloquearEdicaoPrimaria() {
    return this.getEhNovaVersao() || (this.versoes && this.versoes.length > 1);
  }

  ehEdicao() {
    return this.formulario.value.codigo;
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  salvarCobertura(aprovar = false) {
    this.mensagemService.limparMensagens();

    if (this.formulario.valid) {
      const cobertura: any = this.formulario.value;

      if (this.ehEdicao()) {
        this.coberturaService.update(cobertura, aprovar, this.getEhNovaVersao()).subscribe(res => {
          this.mensagemService.enviarMensagem('Operação realizada com sucesso!');
          this.finalizar(cobertura.codigo);
        });
      } else {
        this.coberturaService.add(cobertura, aprovar).subscribe(res => {
          this.mensagemService.enviarMensagem(aprovar ? 'Operação realizada com sucesso!' : 'Cadastro de Cobertura realizado com sucesso!');
          this.finalizar(cobertura.codigo);
        });
      }
    } else {
      this.utilService.validateAllFormFields(this.formulario);
    }
  }

  pesquisarCobertura() {
    this.router.navigate(['/cobertura']);
  }

  aprovarCobertura() {
    this.router.navigate(['/cobertura']);
  }

  finalizar(codigo = false) {
    if (codigo) {
      this.router.navigate(['/cobertura', codigo]);
    } else {
      this.pesquisarCobertura();
    }
  }

}
