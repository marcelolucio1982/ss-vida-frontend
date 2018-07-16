import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoliceDetalheComponent } from './apolice-detalhe.component';

describe('ApoliceDetalheComponent', () => {
  let component: ApoliceDetalheComponent;
  let fixture: ComponentFixture<ApoliceDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoliceDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoliceDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
