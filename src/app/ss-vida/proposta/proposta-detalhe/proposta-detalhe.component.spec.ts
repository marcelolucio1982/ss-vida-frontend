import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaDetalheComponent } from './proposta-detalhe.component';

describe('PropostaDetalheComponent', () => {
  let component: PropostaDetalheComponent;
  let fixture: ComponentFixture<PropostaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
