import { Component, OnInit } from '@angular/core';

import { VersionService } from './services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  version: string;
  constructor(readonly versionService: VersionService) { }

  ngOnInit(): void {
    this.version = this.versionService.getSemVer();
  }

}
