import { TestBed } from '@angular/core/testing';

import { ViewProductService } from './view-product.service';

describe('ViewProductService', () => {
  let service: ViewProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
