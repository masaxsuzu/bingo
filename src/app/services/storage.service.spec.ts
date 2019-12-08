import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

const storage = new StorageService();

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    storage.save('test1', null);
  });

  it('should store value by key', () => {
    const want = { x: 1, y: 'aaa' };
    storage.save('test1', want);
    const got = storage.load('test1');
    expect(want).toEqual(got);
  });
  it('should be null if key not found', () => {
    const got = storage.load('key-not-found');
    expect(null).toEqual(got);
  });
});
