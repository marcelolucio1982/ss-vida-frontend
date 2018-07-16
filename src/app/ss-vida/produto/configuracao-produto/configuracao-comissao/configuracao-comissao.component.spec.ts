import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoComissaoComponent } from './configuracao-comissao.component';

describe('ConfiguracaoComissaoComponent', () => {
  let component: ConfiguracaoComissaoComponent;
  let fixture: ComponentFixture<ConfiguracaoComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
