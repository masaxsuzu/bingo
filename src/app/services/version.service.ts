import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public major: number;
  public minor: number;
  public patch: number;
  public build: string;

  constructor(
    @Inject('number') major: number,
    @Inject('number') minor: number,
    @Inject('number') patch: number,
    @Inject('string') build: string) {

    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.build = build;
  }
  getSemVer(): string {
    return `v${this.major}.${this.minor}.${this.patch}`;
  }
  getFullVer(): string {
    return `v${this.major}.${this.minor}.${this.patch}+${this.build}`;
  }

}
