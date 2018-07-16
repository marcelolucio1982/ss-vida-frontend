import { AssistenciaService } from './../service/assistencia.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistenciaFormComponent } from './assistencia-form.component';

describe('AssistenciaFormComponent', () => {
  let component: AssistenciaFormComponent;
  let fixture: ComponentFixture<AssistenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistenciaFormComponent ] ,
      providers: [ AssistenciaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
