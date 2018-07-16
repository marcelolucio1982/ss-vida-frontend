import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarAssistenciaFormComponent } from './configurar-assistencia-form.component';

describe('ConfigurarAssistenciaFormComponent', () => {
  let component: ConfigurarAssistenciaFormComponent;
  let fixture: ComponentFixture<ConfigurarAssistenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarAssistenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarAssistenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
