import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoCobrancaComponent } from './configuracao-cobranca.component';

describe('ConfiguracaoCobrancaComponent', () => {
  let component: ConfiguracaoCobrancaComponent;
  let fixture: ComponentFixture<ConfiguracaoCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
