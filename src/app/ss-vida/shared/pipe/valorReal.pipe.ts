import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorRealMask', pure: false
})
export class ValorRealPipe implements PipeTransform {

  transform(value: string) {
        if (value) {
          value = value.toString().replace(/\D/g, '');
          value = value.replace(/([0-9]{2})$/g, ',$1');
          if ( value.length > 6 ) {
                  value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
          }
        }
          return 'R$ ' + value;
  }

}
