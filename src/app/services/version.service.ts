import { version } from '../../../package.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public major: number;
  public minor: number;
  public patch: number;

  constructor() {

    this.major = parseInt(version.split('.')[0], 10);
    this.minor = parseInt(version.split('.')[1], 10);
    this.patch = parseInt(version.split('.')[2], 10);
  }
  getSemVer(): string {
    return `v${this.major}.${this.minor}.${this.patch}`;
  }

}
