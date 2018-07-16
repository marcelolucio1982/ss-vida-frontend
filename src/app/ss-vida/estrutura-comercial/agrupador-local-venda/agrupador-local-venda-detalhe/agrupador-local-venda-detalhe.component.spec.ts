import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorLocalVendaDetalheComponent } from './agrupador-local-venda-detalhe.component';

describe('AgrupadorLocalVendaDetalheComponent', () => {
  let component: AgrupadorLocalVendaDetalheComponent;
  let fixture: ComponentFixture<AgrupadorLocalVendaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorLocalVendaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorLocalVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
