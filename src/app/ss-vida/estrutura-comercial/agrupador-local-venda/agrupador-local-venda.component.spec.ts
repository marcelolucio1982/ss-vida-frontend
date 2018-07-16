import { AgrupadorLocalVendaService } from './service/agrupador-local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorLocalVendaComponent } from './agrupador-local-venda.component';

describe('AgrupadorLocalVendaDetalheComponent', () => {
  let component: AgrupadorLocalVendaComponent;
  let fixture: ComponentFixture<AgrupadorLocalVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorLocalVendaComponent ] ,
      providers: [ AgrupadorLocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorLocalVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
