import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-proposta-header',
  templateUrl: './proposta-header.component.html'
})

export class PropostaHeaderComponent {

  @Input()
  public propostaHeaderForm: FormGroup;

}
