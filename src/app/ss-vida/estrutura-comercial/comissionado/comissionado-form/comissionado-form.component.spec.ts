import { ComissionadoService } from './../service/comissionado.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionadoFormComponent } from './comissionado-form.component';

describe('ComissionadoFormComponent', () => {
  let component: ComissionadoFormComponent;
  let fixture: ComponentFixture<ComissionadoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionadoFormComponent ] ,
      providers: [ ComissionadoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
