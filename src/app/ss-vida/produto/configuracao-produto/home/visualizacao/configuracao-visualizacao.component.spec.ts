import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoVisualizacaoComponent } from './configuracao-visualizacao.component';

describe('ConfiguracaoVisualizacaoComponent', () => {
  let component: ConfiguracaoVisualizacaoComponent;
  let fixture: ComponentFixture<ConfiguracaoVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
