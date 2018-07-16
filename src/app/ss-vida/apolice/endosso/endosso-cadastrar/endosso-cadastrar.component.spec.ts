import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndossoCadastrarComponent } from './endosso-cadastrar.component';

describe('EndossoCadastrarComponent', () => {
  let component: EndossoCadastrarComponent;
  let fixture: ComponentFixture<EndossoCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndossoCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndossoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
