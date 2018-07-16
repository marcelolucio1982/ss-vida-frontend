import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../routes/app.routing.module';
import { FormsModule } from '@angular/forms';
import { HomeService } from './service/home.service';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'angular2-materialize';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
  exports: [HomeComponent],
})
export class HomeModule {

}
