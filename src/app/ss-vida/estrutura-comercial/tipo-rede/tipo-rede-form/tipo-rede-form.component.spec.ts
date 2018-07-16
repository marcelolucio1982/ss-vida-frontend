import { TipoRedeService } from './../service/tipo-rede.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRedeFormComponent } from './tipo-rede-form.component';

describe('TipoRedeFormComponent', () => {
  let component: TipoRedeFormComponent;
  let fixture: ComponentFixture<TipoRedeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoRedeFormComponent ] ,
      providers: [ TipoRedeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRedeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
