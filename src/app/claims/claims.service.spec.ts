import { TestBed, inject } from '@angular/core/testing';

import { ClaimsService } from './claims.service';

describe('ClaimsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClaimsService]
    });
  });

  it('should be created', inject([ClaimsService], (service: ClaimsService) => {
    expect(service).toBeTruthy();
  }));
});
