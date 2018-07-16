import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// Fonte: https://embed.plnkr.co/plunk/oA2Day
@Injectable()
export class UtilService {

  private win: any;
  private filtroPesquisa: Map<string, any>;

  constructor() {
    this.win = window;
    this.filtroPesquisa = new Map();
  }

  removeMask(value: any): any {
    return value ? value.replace(/[^\d]+/g, '') : value;
  }

  // Converte uma string representando uma data no formato dd/MM/yyyy para o formato esperado no modelo para consumo no backend.
  public formatarDataModelo(data: string) {
    if (!data) {
      return data;
    }
    const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const arrayDate = data.match(pattern);
    return arrayDate ? `${arrayDate[3]}-${arrayDate[2]}-${arrayDate[1]}T00:00:00.000-02:00` : false;
  }

  // Converte uma string do formato de trabalho do backend para o formato do frontend.
  public formatarDataVisao(data: string) {
    if (!data) {
      return data;
    }
    const pattern = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
    const arrayDate = data.match(pattern);
    return arrayDate ? `${arrayDate[3]}/${arrayDate[2]}/${arrayDate[1]}` : false;
  }

  public formatarValorRealVisao( data: string ) {
    const n = Number( data );
    let c = 2;
    let d = ',';
    let t = '.';
    let j = 0;
    c = isNaN( c = Math.abs( c ) ) ? 2 : c;
    d = d === undefined ? '.' : d;
    t = t === undefined ? ',' : t;
    const s = ( n < 0 ) ? '-' : '';
    const i = String( parseInt( data = Math.abs( Number( data ) || 0 ).toFixed( c ), 10 ) );
    const iNum = Number( i );
    j = ( j = i.length ) > 3 ? j % 3 : 0;
   return 'R$ ' + s + ( j ? i.substr( 0, j ) + t : '' )
        + i.substr( j ).replace( /(\d{3})(?=\d)/g, '$1' + t )
        + ( c ? d + Math.abs( n - iNum ).toFixed( c ).slice( 2 ) : '' );
  }

  public formatarPercentualVisao( data: string ) {
    const n = Number( data );
    let c = 2;
    let d = ',';
    let t = '.';
    let j = 0;
    c = isNaN( c = Math.abs( c ) ) ? 2 : c;
    d = d === undefined ? '.' : d;
    t = t === undefined ? ',' : t;
    const s = ( n < 0 ) ? '-' : '';
    const i = String( parseInt( data = Math.abs( Number( data ) || 0 ).toFixed( c ), 10 ) );
    const iNum = Number( i );
    j = ( j = i.length ) > 3 ? j % 3 : 0;
   return s + ( j ? i.substr( 0, j ) + t : '' )
        + i.substr( j ).replace( /(\d{3})(?=\d)/g, '$1' + t )
        + ( c ? d + Math.abs( n - iNum ).toFixed( c ).slice( 2 ) : '' ) + ' %' ;
  }

  public formatarSimNaoVisao( data: string ) {
    if ( 'S' === data || 's' === data ) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }

  public configurarInputData(frm: any, input: string) {
    frm.valueChanges.subscribe(data => {
      // if (frm.controls[input].touched && data[input]) {
      if (data[input]) {
        let aux: any = this.formatarDataModelo(data[input]);
        if (aux) {
          data[input] = aux;
        } else {
          aux = this.formatarDataVisao(data[input]);
          frm.controls[input].setValue(aux);
        }
      }
    });
  }

  verificaValidTouched(campo, formulario) {
    return !formulario.get(campo).valid && formulario.get(campo).touched;
  }

  aplicaCssErro(campo, formulario) {
    return {
      'has-error': this.verificaValidTouched(campo, formulario),
      'has-feedback': this.verificaValidTouched(campo, formulario)
    };
  }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.status !== 'DISABLED') {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.status !== 'DISABLED') {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getInvalidControls(formGroup: FormGroup) {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
       if (controls[name].invalid) {
          invalid.push(name);
       }
    }
    return invalid;
  }

  updateMaterializeTextFields() {
    if (this.win && this.win.Materialize) {
      this.win.Materialize.updateTextFields();
      this.win.jQuery('select').material_select();
    }
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  getCorrespondentePor(arr, obj, attr: any = false) {
    attr = attr ? attr : obj['id'] ? 'id' : obj['codigo'] ? 'codigo' : 'sigla';
    return obj ? arr.filter(function (el) {
      return el['attr'] === obj['attr'];
    })[0] : null;
  }

  public paginar(currentPage, limit, list) {
    const begin = ((currentPage - 1) * limit);
    const end = begin + limit;
    return list.slice(begin, end);
  }

  public getLinhaInicial( currentPage, limit ) {
    return ((currentPage - 1) * limit) + 1;
  }

  public getLinhaFinal( currentPage, limit ) {
    return this.getLinhaInicial( currentPage, limit ) + limit - 1;
  }

  public setFiltroPesquisa( url: string, filtroPesquisa: any ) {
    this.filtroPesquisa.set( url, filtroPesquisa );
  }

  public getFiltroPesquisa( url: string ): any {
    return this.filtroPesquisa.get( url );
  }

}
