import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoSeguroComponent } from './historico-seguro.component';

describe('HistoricoSeguroComponent', () => {
  let component: HistoricoSeguroComponent;
  let fixture: ComponentFixture<HistoricoSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
