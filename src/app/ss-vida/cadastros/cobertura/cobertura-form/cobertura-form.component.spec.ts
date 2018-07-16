import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaFormComponent } from './cobertura-form.component';

describe('CoberturaFormComponent', () => {
  let component: CoberturaFormComponent;
  let fixture: ComponentFixture<CoberturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoberturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoberturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
