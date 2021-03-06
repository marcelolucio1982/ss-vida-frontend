import { SharedModule } from './../shared/shared.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PaginaNaoEncontradaComponent],
})
export class ErrorModule { }
