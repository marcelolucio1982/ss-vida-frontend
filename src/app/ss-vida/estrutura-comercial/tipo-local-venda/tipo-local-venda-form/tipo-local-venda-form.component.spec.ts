import { TipoLocalVendaService } from './../service/tipo-local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLocalVendaFormComponent } from './tipo-local-venda-form.component';

describe('TipoLocalVendaFormComponent', () => {
  let component: TipoLocalVendaFormComponent;
  let fixture: ComponentFixture<TipoLocalVendaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLocalVendaFormComponent ] ,
      providers: [ TipoLocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLocalVendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
