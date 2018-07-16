import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoFormComponent } from './custo-form.component';

describe('CustoFormComponent', () => {
  let component: CustoFormComponent;
  let fixture: ComponentFixture<CustoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
