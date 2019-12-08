import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { AudioService } from './services/audio.service';
import { ConfirmService } from './services/confirm.service';
import { StorageService } from './services/storage.service';
import { VersionService } from './services/version.service';
import { resolve, display } from '../periodic/const';

const STORAGE_KEY = 'github.com/masaxsuzu/bingo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  version: string;
  interval = 50;
  title = 'bingo';
  current: number;
  numbers: string[];
  items: any[];
  running: boolean;

  constructor(
    readonly audioService: AudioService,
    readonly confirmService: ConfirmService,
    readonly storageService: StorageService,
    readonly versionService: VersionService) {
    this.version = versionService.getSemVer();
    this.initialize();
  }

  initialize(): void {
    const x = this.storageService.load(STORAGE_KEY) || {};
    const c = x.current;
    const n = x.numbers;
    const i = x.items;
    this.current = !!c ? c : 0;
    this.numbers = !!n ? n : Object.keys(resolve).sort((a, b) => uuid() > uuid() ? 1 : -1);
    this.items = !!i ? i : init();
    this.running = false;
  }

  format: (n: number) => string = (n) => {
    return padLeft(`${n}`, 0, 3);
  }

  display: (n: number) => string = (n) => {
    const y = parseInt(resolve[this.numbers[n - 1]], 10);
    const x = display[y];
    return !!x ? x : 'MS';
  }

  async start(): Promise<void> {
    if (this.running) {
      return;
    }

    if (this.current >= this.numbers.length) {
      return;
    }

    const n = this.current;
    this.running = true;
    this.audioService.start();

    // roulette 5s.
    await Promise.all(range(1, 100).map(x => this.roulette(x * this.interval)));

    this.audioService.stop();

    this.running = false;

    this.current = n + 1;
    const mayBeNumber = this.numbers[this.current - 1];
    this.items[parseInt(mayBeNumber, 10) - 1].active = true;

    this.storageService.save(STORAGE_KEY,
      {
        current: this.current,
        numbers: this.numbers,
        items: this.items
      });
  }

  reset(): void {
    if (this.running) {
      return;
    }
    if (this.confirmService.run('Do you really want to reset?')) {
      this.storageService.save(STORAGE_KEY, {});
      this.initialize();
    }
  }

  async roulette(milleSeconds: number): Promise<void> {
    await sleep(milleSeconds);
    this.current = Math.floor((Math.random() * 110) + 0);
  }
}

const sleep: (msec: number) => Promise<void> = msec => new Promise(_ => setTimeout(_, msec));

const init = () => range(1, 163).map(x => {
  return resolve[x]
    ? {
      n: resolve[x],
      active: false,
    }
    : {
      n: '---',
      active: 'none',
    };
});

const range = (from: number, to: number) => [...Array(to - from)].map((_, i) => (from + i));

const padLeft = (val: string, char: number, n: number) => {
  for (; val.length < n; val = `${char}` + val) { }
  return val;
};
