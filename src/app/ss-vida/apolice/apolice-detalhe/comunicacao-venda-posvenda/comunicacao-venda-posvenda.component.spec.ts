import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacaoVendaPosVendaComponent } from './comunicacao-venda-posvenda.component';

describe('ComunicacaoVendaPosVendaComponent', () => {
  let component: ComunicacaoVendaPosVendaComponent;
  let fixture: ComponentFixture<ComunicacaoVendaPosVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicacaoVendaPosVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicacaoVendaPosVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
