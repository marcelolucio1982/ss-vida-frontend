import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarResumoComponent } from './configurar-resumo.component';

describe('ConfigurarResumoComponent', () => {
  let component: ConfigurarResumoComponent;
  let fixture: ComponentFixture<ConfigurarResumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
