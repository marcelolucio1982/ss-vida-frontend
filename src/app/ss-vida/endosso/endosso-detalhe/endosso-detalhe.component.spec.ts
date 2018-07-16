import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndossoDetalheComponent } from './endosso-detalhe.component';

describe('EndossoDetalheComponent', () => {
  let component: EndossoDetalheComponent;
  let fixture: ComponentFixture<EndossoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndossoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndossoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
