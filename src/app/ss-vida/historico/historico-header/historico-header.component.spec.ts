import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoHeaderComponent } from './historico-header.component';

describe('HistoricoHeaderComponent', () => {
  let component: HistoricoHeaderComponent;
  let fixture: ComponentFixture<HistoricoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
