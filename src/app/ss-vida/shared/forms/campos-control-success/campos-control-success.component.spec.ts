import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamposControlSuccessComponent } from './campos-control-success.component';

describe('CamposControlSuccessComponent', () => {
  let component: CamposControlSuccessComponent;
  let fixture: ComponentFixture<CamposControlSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamposControlSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamposControlSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
