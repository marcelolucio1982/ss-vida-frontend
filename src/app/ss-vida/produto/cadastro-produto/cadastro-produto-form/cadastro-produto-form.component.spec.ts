import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroProdutoFormComponent } from './cadastro-produto-form.component';

describe('CadastroProdutoFormComponent', () => {
  let component: CadastroProdutoFormComponent;
  let fixture: ComponentFixture<CadastroProdutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProdutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
