import { TestBed, inject } from '@angular/core/testing';

import { CarregamentoService } from './carregamento.service';

describe('CarregamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarregamentoService]
    });
  });

  it('should be created', inject([CarregamentoService], (service: CarregamentoService) => {
    expect(service).toBeTruthy();
  }));
});
