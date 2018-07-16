import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarSubscricaoService } from './configurar-subscricao.service';

describe('ConfigurarSubscricaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarSubscricaoService]
    });
  });

  it('should be created', inject([ConfigurarSubscricaoService], (service: ConfigurarSubscricaoService) => {
    expect(service).toBeTruthy();
  }));
});
