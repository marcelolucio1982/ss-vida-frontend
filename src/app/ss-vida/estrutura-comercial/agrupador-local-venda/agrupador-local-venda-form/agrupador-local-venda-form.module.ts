import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgrupadorLocalVendaModule } from '../agrupador-local-venda.module';

//import { AgrupadorLocalVendaFormComponent } from './agrupador-local-venda-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgrupadorLocalVendaModule
  ]
})

export class AgrupadorLocalVendaFormModule { }
