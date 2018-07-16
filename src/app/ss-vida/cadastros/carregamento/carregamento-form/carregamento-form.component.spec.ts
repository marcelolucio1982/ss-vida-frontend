import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregamentoFormComponent } from './carregamento-form.component';

describe('CarregamentoFormComponent', () => {
  let component: CarregamentoFormComponent;
  let fixture: ComponentFixture<CarregamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarregamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
