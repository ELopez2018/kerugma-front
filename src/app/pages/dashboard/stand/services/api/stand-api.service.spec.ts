import { TestBed } from '@angular/core/testing';

import { StandApiService } from './stand-api.service';

describe('StandApiService', () => {
  let service: StandApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
