import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoDadosGeraisComponent } from './configuracao-dados-gerais.component';

describe('ConfiguracaoDadosGeraisComponent', () => {
  let component: ConfiguracaoDadosGeraisComponent;
  let fixture: ComponentFixture<ConfiguracaoDadosGeraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoDadosGeraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoDadosGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
