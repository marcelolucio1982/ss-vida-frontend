import { TestBed, inject } from '@angular/core/testing';

import { EmpresasAssistenciaService } from './empresas-assistencia.service';

describe('EmpresasAssistenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresasAssistenciaService]
    });
  });

  it('should be created', inject([EmpresasAssistenciaService], (service: EmpresasAssistenciaService) => {
    expect(service).toBeTruthy();
  }));
});
