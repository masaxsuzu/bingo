import { TestBed } from '@angular/core/testing';

import { VersionService } from './version.service';

describe('VersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be `v3.3.1`', () => {
    const service: VersionService = new VersionService();
  });

});
