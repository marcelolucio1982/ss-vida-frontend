import { TestBed, inject } from '@angular/core/testing';

import { PrecificacaoService } from './precificacao.service';

describe('PrecificacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrecificacaoService]
    });
  });

  it('should be created', inject([PrecificacaoService], (service: PrecificacaoService) => {
    expect(service).toBeTruthy();
  }));
});
