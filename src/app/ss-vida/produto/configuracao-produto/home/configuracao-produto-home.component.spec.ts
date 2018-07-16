import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracaoProdutoComponent } from './../configuracao-produto.component';


describe('ConfiguracaoProdutoComponent', () => {
  let component: ConfiguracaoProdutoComponent;
  let fixture: ComponentFixture<ConfiguracaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
