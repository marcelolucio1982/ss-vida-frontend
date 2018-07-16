import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask', pure: false
})
export class CepPipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      value = value.replace(/\D+/g, '');
return value.substr(0, 5) + '-' + value.substr(5, 3);
    }
}

}
