import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarComissaoFormComponent } from './configurar-comissao-form.component';

describe('ConfigurarComissaoFormComponent', () => {
  let component: ConfigurarComissaoFormComponent;
  let fixture: ComponentFixture<ConfigurarComissaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarComissaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarComissaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
