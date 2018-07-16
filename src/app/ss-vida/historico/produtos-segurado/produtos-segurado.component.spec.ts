import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosSeguradoComponent } from './produtos-segurado.component';

describe('ProdutoSeguradoComponent', () => {
  let component: ProdutosSeguradoComponent;
  let fixture: ComponentFixture<ProdutosSeguradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosSeguradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosSeguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
