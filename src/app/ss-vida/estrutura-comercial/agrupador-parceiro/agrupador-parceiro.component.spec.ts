import { AgrupadorParceiroService } from './service/agrupador-parceiro.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupadorParceiroComponent } from './agrupador-parceiro.component';

describe('AgrupadorParceiroDetalheComponent', () => {
  let component: AgrupadorParceiroComponent;
  let fixture: ComponentFixture<AgrupadorParceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupadorParceiroComponent ] ,
      providers: [ AgrupadorParceiroService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupadorParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
