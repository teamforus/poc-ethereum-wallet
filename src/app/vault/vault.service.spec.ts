import { TestBed, inject } from '@angular/core/testing';

import { VaultService } from './vault.service';

describe('VaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VaultService]
    });
  });

  it('should be created', inject([VaultService], (service: VaultService) => {
    expect(service).toBeTruthy();
  }));
});
