import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoImportacaoComponent } from './configuracao-importacao.component';

describe('ConfiguracaoImportacaoComponent', () => {
  let component: ConfiguracaoImportacaoComponent;
  let fixture: ComponentFixture<ConfiguracaoImportacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoImportacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoImportacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
