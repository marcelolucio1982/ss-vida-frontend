import { TestBed, inject } from '@angular/core/testing';

import { CustoService } from './custo.service';

describe('CustoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustoService]
    });
  });

  it('should be created', inject([CustoService], (service: CustoService) => {
    expect(service).toBeTruthy();
  }));
});
