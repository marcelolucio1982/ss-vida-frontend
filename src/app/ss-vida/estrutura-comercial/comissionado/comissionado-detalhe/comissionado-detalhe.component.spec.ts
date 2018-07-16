import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionadoDetalheComponent } from './comissionado-detalhe.component';

describe('ComissionadoDetalheComponent', () => {
  let component: ComissionadoDetalheComponent;
  let fixture: ComponentFixture<ComissionadoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionadoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionadoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
