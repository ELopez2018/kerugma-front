import { TestBed } from '@angular/core/testing';

import { CongregationDataService } from './congregation-data.service';

describe('CongregationDataService', () => {
  let service: CongregationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongregationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
