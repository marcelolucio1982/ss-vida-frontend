import { TestBed, inject } from '@angular/core/testing';

import { ConfiguracaoProdutoService } from './configuracao-produto.service';

describe('ConfiguracaoProdutoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguracaoProdutoService]
    });
  });

  it('should be created', inject([ConfiguracaoProdutoService], (service: ConfiguracaoProdutoService) => {
    expect(service).toBeTruthy();
  }));
});
