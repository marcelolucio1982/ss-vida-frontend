import { TestBed, inject } from '@angular/core/testing';

import { LocalVendaService } from './local-venda.service';

describe('LocalVendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalVendaService]
    });
  });

  it('should be created', inject([LocalVendaService], (service: LocalVendaService) => {
    expect(service).toBeTruthy();
  }));
});
