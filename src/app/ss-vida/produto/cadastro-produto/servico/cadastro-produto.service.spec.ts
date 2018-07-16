import { TestBed, inject } from '@angular/core/testing';

import { CadastroProdutoService } from './cadastro-produto.service';

describe('CadastroProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroProdutoService]
    });
  });

  it('should be created', inject([CadastroProdutoService], (service: CadastroProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
