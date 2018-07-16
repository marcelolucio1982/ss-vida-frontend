import { LocalVendaService } from './service/local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVendaComponent } from './local-venda.component';

describe('LocalVendaDetalheComponent', () => {
  let component: LocalVendaComponent;
  let fixture: ComponentFixture<LocalVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalVendaComponent ] ,
      providers: [ LocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
