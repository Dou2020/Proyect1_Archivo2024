import { TestBed } from '@angular/core/testing';

import { EmployeerService } from './employeer.service';

describe('EmployeerService', () => {
  let service: EmployeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
