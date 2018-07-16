import { TestBed, inject } from '@angular/core/testing';

import { ComissionadoService } from './comissionado.service';

describe('ComissionadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComissionadoService]
    });
  });

  it('should be created', inject([ComissionadoService], (service: ComissionadoService) => {
    expect(service).toBeTruthy();
  }));
});
