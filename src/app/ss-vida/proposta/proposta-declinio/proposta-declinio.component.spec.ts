import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaDeclinioComponent } from './proposta-declinio.component';

describe('PropostaDeclinioComponent', () => {
  let component: PropostaDeclinioComponent;
  let fixture: ComponentFixture<PropostaDeclinioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaDeclinioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaDeclinioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
