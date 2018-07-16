import { PropostaService } from './service/proposta.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaComponent } from './proposta.component';

describe('PropostaComponent', () => {
  let component: PropostaComponent;
  let fixture: ComponentFixture<PropostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaComponent ] ,
      providers: [ PropostaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
