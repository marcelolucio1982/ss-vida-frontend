import { TestBed, inject } from '@angular/core/testing';

import { TipoLocalVendaService } from './tipo-local-venda.service';

describe('TipoLocalVendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoLocalVendaService]
    });
  });

  it('should be created', inject([TipoLocalVendaService], (service: TipoLocalVendaService) => {
    expect(service).toBeTruthy();
  }));
});
