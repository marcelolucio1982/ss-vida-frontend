import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoDashboardComponent } from './configuracao-dashboard.component';

describe('ConfiguracaoDashboardComponent', () => {
  let component: ConfiguracaoDashboardComponent;
  let fixture: ComponentFixture<ConfiguracaoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
