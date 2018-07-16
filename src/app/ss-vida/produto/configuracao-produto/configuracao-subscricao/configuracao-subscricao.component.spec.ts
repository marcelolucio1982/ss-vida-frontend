import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoSubscricaoComponent } from './configuracao-subscricao.component';

describe('ConfiguracaoSubscricaoComponent', () => {
  let component: ConfiguracaoSubscricaoComponent;
  let fixture: ComponentFixture<ConfiguracaoSubscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoSubscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoSubscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
