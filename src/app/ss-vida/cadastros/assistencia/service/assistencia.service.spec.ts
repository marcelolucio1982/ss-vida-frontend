import { TestBed, inject } from '@angular/core/testing';

import { AssistenciaService } from './assistencia.service';

describe('AssistenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistenciaService]
    });
  });

  it('should be created', inject([AssistenciaService], (service: AssistenciaService) => {
    expect(service).toBeTruthy();
  }));
});
