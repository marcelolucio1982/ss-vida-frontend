import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-produto-header',
  templateUrl: './produto-header.component.html',
})
export class ProdutoHeaderComponent {

  @Input()
  public produtoHeaderForm: FormGroup;

}
