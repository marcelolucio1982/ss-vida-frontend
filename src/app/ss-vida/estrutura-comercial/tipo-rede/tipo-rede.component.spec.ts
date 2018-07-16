import { TipoRedeService } from './service/tipo-rede.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRedeComponent } from './tipo-rede.component';

describe('TipoRedeDetalheComponent', () => {
  let component: TipoRedeComponent;
  let fixture: ComponentFixture<TipoRedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoRedeComponent ] ,
      providers: [ TipoRedeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
