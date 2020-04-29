import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

const STORAGE_KEY = 'github.com/masaxsuzu/bingo/v3';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less']
})

export class ConfigComponent implements OnInit {

  max: number;
  readonly data: any;
  constructor(readonly storageService: StorageService) {
    this.max = 100;
    this.data = storageService.load(STORAGE_KEY);
  }

  ngOnInit(): void {
  }

}
