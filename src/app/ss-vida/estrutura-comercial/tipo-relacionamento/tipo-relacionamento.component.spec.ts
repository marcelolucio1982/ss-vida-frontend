import { TipoRelacionamentoService } from './service/tipo-relacionamento.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRelacionamentoComponent } from './tipo-relacionamento.component';

describe('TipoRelacionamentoDetalheComponent', () => {
  let component: TipoRelacionamentoComponent;
  let fixture: ComponentFixture<TipoRelacionamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoRelacionamentoComponent ] ,
      providers: [ TipoRelacionamentoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRelacionamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
