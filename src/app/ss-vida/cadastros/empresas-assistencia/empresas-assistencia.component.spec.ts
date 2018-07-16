import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasAssistenciaComponent } from './empresas-assistencia.component';

describe('EmpresasAssistenciaComponent', () => {
  let component: EmpresasAssistenciaComponent;
  let fixture: ComponentFixture<EmpresasAssistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAssistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAssistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
