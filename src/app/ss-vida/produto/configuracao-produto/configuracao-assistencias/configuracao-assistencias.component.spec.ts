import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoAssistenciasComponent } from './configuracao-assistencias.component';

describe('ConfiguracaoAssistenciasComponent', () => {
  let component: ConfiguracaoAssistenciasComponent;
  let fixture: ComponentFixture<ConfiguracaoAssistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoAssistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoAssistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
