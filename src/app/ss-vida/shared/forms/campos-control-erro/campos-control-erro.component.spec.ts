import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamposControlErroComponent } from './campos-control-erro.component';

describe('CamposControlErroComponent', () => {
  let component: CamposControlErroComponent;
  let fixture: ComponentFixture<CamposControlErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamposControlErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamposControlErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
