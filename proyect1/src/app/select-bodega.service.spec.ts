import { TestBed } from '@angular/core/testing';

import { SelectBodegaService } from './select-bodega.service';

describe('SelectBodegaService', () => {
  let service: SelectBodegaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectBodegaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
