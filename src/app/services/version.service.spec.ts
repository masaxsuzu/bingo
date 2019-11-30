import { TestBed } from '@angular/core/testing';

import { VersionService } from './version.service';

describe('VersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be `v1.2.3`', () => {
    const service: VersionService = new VersionService(1, 2, 3, 'test');
    expect(service.getSemVer()).toBe('v1.2.3');
  });

  it('should be `v1.2.3+test`', () => {
    const service: VersionService = new VersionService(1, 2, 3, 'test');
    expect(service.getFullVer()).toBe('v1.2.3+test');
  });

});
