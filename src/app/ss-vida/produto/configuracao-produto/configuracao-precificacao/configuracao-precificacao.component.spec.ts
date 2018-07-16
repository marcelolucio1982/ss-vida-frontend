import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoPrecificacaoComponent } from './configuracao-precificacao.component';

describe('ConfiguracaoPrecificacaoComponent', () => {
  let component: ConfiguracaoPrecificacaoComponent;
  let fixture: ComponentFixture<ConfiguracaoPrecificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoPrecificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoPrecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
