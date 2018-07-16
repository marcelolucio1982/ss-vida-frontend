import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCobrancaComponent } from './configurar-cobranca.component';

describe('ConfigurarCobrancaComponent', () => {
  let component: ConfigurarCobrancaComponent;
  let fixture: ComponentFixture<ConfigurarCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
