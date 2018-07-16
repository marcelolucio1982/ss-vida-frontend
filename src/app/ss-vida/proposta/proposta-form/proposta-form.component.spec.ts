import { PropostaService } from './../service/proposta.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaFormComponent } from './proposta-form.component';

describe('PropostaFormComponent', () => {
  let component: PropostaFormComponent;
  let fixture: ComponentFixture<PropostaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaFormComponent ] ,
      providers: [ PropostaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
