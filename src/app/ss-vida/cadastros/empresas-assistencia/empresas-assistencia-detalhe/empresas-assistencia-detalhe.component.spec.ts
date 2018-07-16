import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasAssistenciaDetalheComponent } from './empresas-assistencia-detalhe.component';

describe('EmpresasDetalheComponent', () => {
  let component: EmpresasAssistenciaDetalheComponent;
  let fixture: ComponentFixture<EmpresasAssistenciaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAssistenciaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAssistenciaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
