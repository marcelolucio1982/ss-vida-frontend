import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoDetalheComponent } from './custo-detalhe.component';

describe('CustoDetalheComponent', () => {
  let component: CustoDetalheComponent;
  let fixture: ComponentFixture<CustoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
