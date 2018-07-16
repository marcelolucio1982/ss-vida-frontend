import { ComissionadoService } from './service/comissionado.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionadoComponent } from './comissionado.component';

describe('ComissionadoDetalheComponent', () => {
  let component: ComissionadoComponent;
  let fixture: ComponentFixture<ComissionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionadoComponent ] ,
      providers: [ ComissionadoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
