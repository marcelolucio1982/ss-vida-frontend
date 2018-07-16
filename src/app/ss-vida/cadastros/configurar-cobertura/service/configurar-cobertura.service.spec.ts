import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarCoberturaService } from './configurar-cobertura.service';

describe('ConfigurarCoberturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarCoberturaService]
    });
  });

  it('should be created', inject([ConfigurarCoberturaService], (service: ConfigurarCoberturaService) => {
    expect(service).toBeTruthy();
  }));
});
