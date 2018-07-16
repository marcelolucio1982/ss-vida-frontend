import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCobrancaFormComponent } from './configurar-cobranca-form.component';

describe('ConfigurarCobrancaFormComponent', () => {
  let component: ConfigurarCobrancaFormComponent;
  let fixture: ComponentFixture<ConfigurarCobrancaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarCobrancaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarCobrancaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
