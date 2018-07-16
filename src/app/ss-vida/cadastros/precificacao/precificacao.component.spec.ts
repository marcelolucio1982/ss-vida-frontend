import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecificacaoComponent } from './precificacao.component';

describe('PrecificacaoComponent', () => {
  let component: PrecificacaoComponent;
  let fixture: ComponentFixture<PrecificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
