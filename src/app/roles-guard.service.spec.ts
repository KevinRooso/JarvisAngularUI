import { TestBed } from '@angular/core/testing';

import { RolesGuardService } from './roles-guard.service';

describe('RolesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesGuardService = TestBed.get(RolesGuardService);
    expect(service).toBeTruthy();
  });
});
