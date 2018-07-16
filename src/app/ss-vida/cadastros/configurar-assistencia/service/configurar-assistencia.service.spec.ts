import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarAssistenciaService } from './configurar-assistencia.service';

describe('ConfigurarAssistenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarAssistenciaService]
    });
  });

  it('should be created', inject([ConfigurarAssistenciaService], (service: ConfigurarAssistenciaService) => {
    expect(service).toBeTruthy();
  }));
});
