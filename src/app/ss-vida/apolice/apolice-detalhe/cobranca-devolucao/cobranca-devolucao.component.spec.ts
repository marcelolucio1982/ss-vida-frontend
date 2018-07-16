import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrancaDevolucaoComponent } from './cobranca-devolucao.component';

describe('CobrancaDevolucaoComponent', () => {
  let component: CobrancaDevolucaoComponent;
  let fixture: ComponentFixture<CobrancaDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrancaDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrancaDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
