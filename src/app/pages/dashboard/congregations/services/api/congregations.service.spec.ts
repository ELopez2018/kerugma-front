import { TestBed } from '@angular/core/testing';

import { CongregationsApiService } from './congregations.service';

describe('CongregationsService', () => {
  let service: CongregationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongregationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
