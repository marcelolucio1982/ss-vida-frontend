import { TipoRelacionamentoService } from './../service/tipo-relacionamento.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRelacionamentoFormComponent } from './tipo-relacionamento-form.component';

describe('TipoVendedorFormComponent', () => {
  let component: TipoRelacionamentoFormComponent;
  let fixture: ComponentFixture<TipoRelacionamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoRelacionamentoFormComponent ] ,
      providers: [ TipoRelacionamentoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRelacionamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
