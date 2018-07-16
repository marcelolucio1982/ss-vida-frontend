import { TipoLocalVendaService } from './service/tipo-local-venda.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLocalVendaComponent } from './tipo-local-venda.component';

describe('AgrupadorLocalVendaDetalheComponent', () => {
  let component: TipoLocalVendaComponent;
  let fixture: ComponentFixture<TipoLocalVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLocalVendaComponent ] ,
      providers: [ TipoLocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLocalVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
