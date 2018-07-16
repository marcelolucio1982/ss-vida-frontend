import { TestBed, inject } from '@angular/core/testing';

import { TipoRelacionamentoService } from './tipo-relacionamento.service';

describe('TipoRelacionamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoRelacionamentoService]
    });
  });

  it('should be created', inject([TipoRelacionamentoService], (service: TipoRelacionamentoService) => {
    expect(service).toBeTruthy();
  }));
});
