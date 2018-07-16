import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDevolucaoComponent } from './detalhe-devolucao.component';

describe('DetalheDevolucaoComponent', () => {
  let component: DetalheDevolucaoComponent;
  let fixture: ComponentFixture<DetalheDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
