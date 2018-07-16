import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSeguradoComponent } from './historico-segurado.component';

describe('HistoricoSeguradoComponent', () => {
  let component: HistoricoSeguradoComponent;
  let fixture: ComponentFixture<HistoricoSeguradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoSeguradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoSeguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
