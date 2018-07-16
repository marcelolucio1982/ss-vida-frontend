import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCoberturaFormComponent } from './configurar-cobertura-form.component';

describe('ConfigurarCoberturaFormComponent', () => {
  let component: ConfigurarCoberturaFormComponent;
  let fixture: ComponentFixture<ConfigurarCoberturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarCoberturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarCoberturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
