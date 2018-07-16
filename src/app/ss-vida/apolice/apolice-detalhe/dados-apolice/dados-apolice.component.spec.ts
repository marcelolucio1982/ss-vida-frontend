import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosApoliceComponent } from './dados-apolice.component';

describe('DadosApoliceComponent', () => {
  let component: DadosApoliceComponent;
  let fixture: ComponentFixture<DadosApoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosApoliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosApoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
