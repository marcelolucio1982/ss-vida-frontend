import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoAcopladosComponent } from './configuracao-acoplados.component';

describe('ConfiguracaoAcopladosComponent', () => {
  let component: ConfiguracaoAcopladosComponent;
  let fixture: ComponentFixture<ConfiguracaoAcopladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoAcopladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoAcopladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
