import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaDetalheComponent } from './cobertura-detalhe.component';

describe('CoberturaDetalheComponent', () => {
  let component: CoberturaDetalheComponent;
  let fixture: ComponentFixture<CoberturaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoberturaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoberturaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
