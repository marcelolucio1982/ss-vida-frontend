import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoCoberturaComponent } from './configuracao-cobertura.component';

describe('ConfiguracaoCoberturaComponent', () => {
  let component: ConfiguracaoCoberturaComponent;
  let fixture: ComponentFixture<ConfiguracaoCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
