import { TestBed } from '@angular/core/testing';

import { SmartApartmentDataService } from './smart-apartment-data.service';

describe('SmartApartmentDataService', () => {
  let service: SmartApartmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartApartmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
