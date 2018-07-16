import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarComissaoComponent } from './configurar-comissao.component';

describe('ConfigurarComissaoComponent', () => {
  let component: ConfigurarComissaoComponent;
  let fixture: ComponentFixture<ConfigurarComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
