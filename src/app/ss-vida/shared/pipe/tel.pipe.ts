import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telMask', pure: false
})
export class TelPipe implements PipeTransform {

  transform(value: string) {
     if (value) {
       value = value.toString().replace(/\D/g, '');
            value = value.toString();
            value = value.replace(/^(\d\d)(\d)/g, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            return value;
    }
      return value;
  }

}
