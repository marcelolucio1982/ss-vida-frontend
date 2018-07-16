import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoginService, Router, useClass: MockRouter}
      ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

});
