import { TestBed, inject } from '@angular/core/testing';

import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScannerService]
    });
  });

  it('should be created', inject([ScannerService], (service: ScannerService) => {
    expect(service).toBeTruthy();
  }));
});
