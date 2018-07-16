import { TestBed, inject } from '@angular/core/testing';

import { TipoVendedorService } from './tipo-vendedor.service';

describe('TipoVendedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoVendedorService]
    });
  });

  it('should be created', inject([TipoVendedorService], (service: TipoVendedorService) => {
    expect(service).toBeTruthy();
  }));
});
