import { TestBed, inject } from '@angular/core/testing';

import { AgrupadorLocalVendaService } from './agrupador-local-venda.service';

describe('AgrupadorLocalVendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgrupadorLocalVendaService]
    });
  });

  it('should be created', inject([AgrupadorLocalVendaService], (service: AgrupadorLocalVendaService) => {
    expect(service).toBeTruthy();
  }));
});
