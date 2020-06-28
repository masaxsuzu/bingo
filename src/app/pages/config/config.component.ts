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
  data: any;
  constructor(readonly storageService: StorageService) {
  }

  ngOnInit(): void {
    this.max = 100;
    this.data = this.storageService.load(STORAGE_KEY);
  }

}
