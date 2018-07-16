import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cnpjMask', pure: false})
export class CnpjPipe implements PipeTransform {

  transform(value: string) {
     if (value) {
        value = value.toString().replace(/\D+/g, '');
          if (value.length === 14) {
               return  value.replace( /^(\d{2})(\d)/ , '$1.$2')
                            .replace( /^(\d{2})\.(\d{3})(\d)/ , '$1.$2.$3')
                            .replace( /\.(\d{3})(\d)/ , '.$1/$2')
                            .replace( /(\d{4})(\d)/ , '$1-$2');
          }
      }
      return value;
  }

}
