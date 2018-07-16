import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacaoFormComponent } from './importacao-form.component';

describe('ImportacaoFormComponent', () => {
  let component: ImportacaoFormComponent;
  let fixture: ComponentFixture<ImportacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
