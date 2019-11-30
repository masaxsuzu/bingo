import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  major: number;
  minor: number;
  patch: number;
  build: string;

  constructor(major: number, minor: number, patch: number, build: string) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.build = build;
    console.log(this.getFullVer());
  }
  getSemVer(): string {
    return `v${this.major}.${this.minor}.${this.patch}`;
  }
  getFullVer(): string {
    return `v${this.major}.${this.minor}.${this.patch}+${this.build}`;
  }

}
