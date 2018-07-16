import { TipoVendedorService } from './../service/tipo-vendedor.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVendedorFormComponent } from './tipo-vendedor-form.component';

describe('TipoVendedorFormComponent', () => {
  let component: TipoVendedorFormComponent;
  let fixture: ComponentFixture<TipoVendedorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoVendedorFormComponent ] ,
      providers: [ TipoVendedorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVendedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
