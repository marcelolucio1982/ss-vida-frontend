import { TestBed, inject } from '@angular/core/testing';

import { EndossoService } from './endosso.service';

describe('EndossoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndossoService]
    });
  });

  it('should be created', inject([EndossoService], (service: EndossoService) => {
    expect(service).toBeTruthy();
  }));
});
