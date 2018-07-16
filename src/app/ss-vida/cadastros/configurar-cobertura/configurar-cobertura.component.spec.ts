import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCoberturaComponent } from './configurar-cobertura.component';

describe('ConfigurarCoberturaComponent', () => {
  let component: ConfigurarCoberturaComponent;
  let fixture: ComponentFixture<ConfigurarCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
