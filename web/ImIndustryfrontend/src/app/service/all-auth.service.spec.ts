import { TestBed, inject } from '@angular/core/testing';

import { AllAuthService } from './all-auth.service';

describe('AllAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllAuthService]
    });
  });

  it('should be created', inject([AllAuthService], (service: AllAuthService) => {
    expect(service).toBeTruthy();
  }));
});
