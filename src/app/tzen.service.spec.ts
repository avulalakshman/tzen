import { TestBed } from '@angular/core/testing';

import { TzenService } from './tzen.service';

describe('TzenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TzenService = TestBed.get(TzenService);
    expect(service).toBeTruthy();
  });
});
