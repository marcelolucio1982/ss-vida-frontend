import { TestBed, inject } from '@angular/core/testing';

import { TipoRedeService } from './local-rede.service';

describe('TipoRedeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoRedeService]
    });
  });

  it('should be created', inject([TipoRedeService], (service: TipoRedeService) => {
    expect(service).toBeTruthy();
  }));
});
