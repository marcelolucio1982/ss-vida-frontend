import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasAssistenciaFormComponent } from './empresas-assistencia-form.component';

describe('EmpresasAssistenciaFormComponent', () => {
  let component: EmpresasAssistenciaFormComponent;
  let fixture: ComponentFixture<EmpresasAssistenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAssistenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAssistenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
