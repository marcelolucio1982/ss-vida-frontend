import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVendaDetalheComponent } from './local-venda-detalhe.component';

describe('LocalVendaDetalheComponent', () => {
  let component: LocalVendaDetalheComponent;
  let fixture: ComponentFixture<LocalVendaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalVendaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVendaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
