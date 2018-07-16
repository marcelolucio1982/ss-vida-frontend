import { TipoLocalVendaService } from './service/tipo-vendedor.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVendedorComponent } from './tipo-vendedor.component';

describe('TipoVendedorDetalheComponent', () => {
  let component: TipoVendedorComponent;
  let fixture: ComponentFixture<TipoVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoVendedorComponent ] ,
      providers: [ TipoLocalVendaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
