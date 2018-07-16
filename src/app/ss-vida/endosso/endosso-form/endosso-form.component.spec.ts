import { EndossoService } from './../service/endosso.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndossoFormComponent } from './endosso-form.component';

describe('EndossoFormComponent', () => {
  let component: EndossoFormComponent;
  let fixture: ComponentFixture<EndossoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndossoFormComponent ] ,
      providers: [ EndossoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndossoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
