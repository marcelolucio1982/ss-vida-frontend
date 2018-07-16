import { ApoliceService } from './service/apolice.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoliceComponent } from './apolice.component';

describe('ApoliceComponent', () => {
  let component: ApoliceComponent;
  let fixture: ComponentFixture<ApoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoliceComponent ] ,
      providers: [ ApoliceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
