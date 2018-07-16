import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarResumoService } from './configurar-resumo.service';

describe('ConfigurarResumoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarResumoService]
    });
  });

  it('should be created', inject([ConfigurarResumoService], (service: ConfigurarResumoService) => {
    expect(service).toBeTruthy();
  }));
});
