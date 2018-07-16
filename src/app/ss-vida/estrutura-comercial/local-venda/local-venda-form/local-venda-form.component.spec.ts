import { LocalVendaService } from './../service/local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVendaFormComponent } from './local-venda-form.component';

describe('LocalVendaFormComponent', () => {
  let component: LocalVendaFormComponent;
  let fixture: ComponentFixture<LocalVendaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalVendaFormComponent ] ,
      providers: [ LocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVendaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
