import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarAssistenciaComponent } from './configurar-assistencia.component';

describe('ConfigurarAssistenciaComponent', () => {
  let component: ConfigurarAssistenciaComponent;
  let fixture: ComponentFixture<ConfigurarAssistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarAssistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarAssistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
