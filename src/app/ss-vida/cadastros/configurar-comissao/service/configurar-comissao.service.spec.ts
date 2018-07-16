import { TestBed, inject } from '@angular/core/testing';

import { ConfigurarComissaoService } from './configurar-comissao.service';

describe('ConfigurarComissaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurarComissaoService]
    });
  });

  it('should be created', inject([ConfigurarComissaoService], (service: ConfigurarComissaoService) => {
    expect(service).toBeTruthy();
  }));
});
