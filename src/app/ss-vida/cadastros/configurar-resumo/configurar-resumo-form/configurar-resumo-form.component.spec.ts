import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarResumoFormComponent } from './configurar-resumo-form.component';

describe('ConfigurarResumoFormComponent', () => {
  let component: ConfigurarResumoFormComponent;
  let fixture: ComponentFixture<ConfigurarResumoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarResumoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarResumoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
