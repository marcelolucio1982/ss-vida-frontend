import { TestBed, inject } from '@angular/core/testing';

import { AgrupadorParceiroService } from './agrupador-parceiro.service';

describe('AgrupadorParceiroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgrupadorParceiroService]
    });
  });

  it('should be created', inject([AgrupadorParceiroService], (service: AgrupadorParceiroService) => {
    expect(service).toBeTruthy();
  }));
});
