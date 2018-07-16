import { ParceiroService } from './service/parceiro.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroComponent } from './parceiro.component';

describe('ParceiroDetalheComponent', () => {
  let component: ParceiroComponent;
  let fixture: ComponentFixture<ParceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroComponent ] ,
      providers: [ ParceiroService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
