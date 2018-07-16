import { TestBed, inject } from '@angular/core/testing';

import { ApoliceService } from './apolice.service';

describe('ApoliceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApoliceService]
    });
  });

  it('should be created', inject([ApoliceService], (service: ApoliceService) => {
    expect(service).toBeTruthy();
  }));
});
