import { TestBed } from '@angular/core/testing';

import { ViewEmployeesService } from './view-employees.service';

describe('ViewEmployeesService', () => {
  let service: ViewEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
