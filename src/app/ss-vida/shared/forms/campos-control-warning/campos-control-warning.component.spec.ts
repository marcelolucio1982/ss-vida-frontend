import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamposControlWarningComponent } from './campos-control-warning.component';

describe('CamposControlWarningComponent', () => {
  let component: CamposControlWarningComponent;
  let fixture: ComponentFixture<CamposControlWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamposControlWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamposControlWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
