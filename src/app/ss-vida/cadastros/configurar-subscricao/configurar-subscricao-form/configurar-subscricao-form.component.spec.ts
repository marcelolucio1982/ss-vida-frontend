import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarSubscricaoFormComponent } from './configurar-subscricao-form.component';

describe('ConfigurarSubscricaoFormComponent', () => {
  let component: ConfigurarSubscricaoFormComponent;
  let fixture: ComponentFixture<ConfigurarSubscricaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSubscricaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarSubscricaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
