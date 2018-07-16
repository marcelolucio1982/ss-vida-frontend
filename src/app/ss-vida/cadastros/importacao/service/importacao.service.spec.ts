import { TestBed, inject } from '@angular/core/testing';

import { ImportacaoService } from './importacao.service';

describe('ImportacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportacaoService]
    });
  });

  it('should be created', inject([ImportacaoService], (service: ImportacaoService) => {
    expect(service).toBeTruthy();
  }));
});
