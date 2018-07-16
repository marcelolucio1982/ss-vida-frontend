import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndossoComponent } from './endosso.component';

describe('EndossoComponent', () => {
  let component: EndossoComponent;
  let fixture: ComponentFixture<EndossoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndossoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndossoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
