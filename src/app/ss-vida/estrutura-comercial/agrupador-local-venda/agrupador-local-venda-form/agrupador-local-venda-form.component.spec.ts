import { AgrupadorLocalVendaService } from './../service/agrupador-local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorLocalVendaFormComponent } from './agrupador-local-venda-form.component';

describe('AgrupadorLocalVendaFormComponent', () => {
  let component: AgrupadorLocalVendaFormComponent;
  let fixture: ComponentFixture<AgrupadorLocalVendaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorLocalVendaFormComponent ] ,
      providers: [ AgrupadorLocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorLocalVendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
