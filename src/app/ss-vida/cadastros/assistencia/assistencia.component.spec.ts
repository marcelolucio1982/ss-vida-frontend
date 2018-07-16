import { AssistenciaService } from './service/assistencia.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistenciaComponent } from './assistencia.component';

describe('AssistenciaDetalheComponent', () => {
  let component: AssistenciaComponent;
  let fixture: ComponentFixture<AssistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistenciaComponent ] ,
      providers: [ AssistenciaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
