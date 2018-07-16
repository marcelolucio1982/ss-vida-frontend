import { ParceiroService } from './../service/parceiro.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroFormComponent } from './parceiro-form.component';

describe('ParceiroFormComponent', () => {
  let component: ParceiroFormComponent;
  let fixture: ComponentFixture<ParceiroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroFormComponent ] ,
      providers: [ ParceiroService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
