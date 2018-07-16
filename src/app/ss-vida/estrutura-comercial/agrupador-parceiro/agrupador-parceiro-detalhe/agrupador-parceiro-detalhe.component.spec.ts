import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorParceiroDetalheComponent } from './agrupador-parceiro-detalhe.component';

describe('AgrupadorParceiroDetalheComponent', () => {
  let component: AgrupadorParceiroDetalheComponent;
  let fixture: ComponentFixture<AgrupadorParceiroDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorParceiroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorParceiroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
