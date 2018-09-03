import { TestBed, inject } from '@angular/core/testing';

import { IdentityService } from '@app/identity.service';

describe('IdentityServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentityService]
    });
  });

  it('should be created', inject([IdentityService], (service: IdentityService) => {
    expect(service).toBeTruthy();
  }));
});
