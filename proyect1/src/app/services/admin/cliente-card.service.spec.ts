import { TestBed } from '@angular/core/testing';

import { ClienteCardService } from './cliente-card.service';

describe('ClienteCardService', () => {
  let service: ClienteCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
