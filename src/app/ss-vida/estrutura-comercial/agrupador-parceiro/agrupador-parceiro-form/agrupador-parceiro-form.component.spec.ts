import { AgrupadorParceiroService } from './../service/agrupador-parceiro.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorParceiroFormComponent } from './agrupador-parceiro-form.component';

describe('AgrupadorParceiroFormComponent', () => {
  let component: AgrupadorParceiroFormComponent;
  let fixture: ComponentFixture<AgrupadorParceiroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorParceiroFormComponent ] ,
      providers: [ AgrupadorParceiroService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorParceiroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
