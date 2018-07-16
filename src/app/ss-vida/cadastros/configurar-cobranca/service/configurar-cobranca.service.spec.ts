import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarCobrancaService } from './configurar-cobranca.service';

describe('ConfigurarCobrancaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarCobrancaService]
    });
  });

  it('should be created', inject([ConfigurarCobrancaService], (service: ConfigurarCobrancaService) => {
    expect(service).toBeTruthy();
  }));
});
