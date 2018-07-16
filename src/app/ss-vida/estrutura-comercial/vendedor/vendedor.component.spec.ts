import { ParceiroService } from './service/vendedor.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorComponent } from './vendedor.component';

describe('VendedorDetalheComponent', () => {
  let component: VendedorComponent;
  let fixture: ComponentFixture<VendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorComponent ] ,
      providers: [ ParceiroService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
