import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarSubscricaoComponent } from './configurar-subscricao.component';

describe('ConfigurarSubscricaoComponent', () => {
  let component: ConfigurarSubscricaoComponent;
  let fixture: ComponentFixture<ConfigurarSubscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarSubscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarSubscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
