import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cpfMask', pure: false})
export class CpfPipe implements PipeTransform {

    transform(value: string) {
       if (value) {
         value = value.toString().replace(/\D+/g, '');
         if ( value.length > 11 ) {
          value = value.substring( value.length - 11 );
         }
         if (value.length === 11) {
            value = value.toString();
                  return value.substring(0, 3).concat('.')
                                     .concat(value.substring(3, 6))
                                     .concat('.')
                                     .concat(value.substring(6, 9))
                                     .concat('-')
                                     .concat(value.substring(9, 11));
        }
      }
        return value;
    }

}
