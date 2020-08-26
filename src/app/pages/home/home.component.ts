import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { NgxSpinnerService } from 'ngx-spinner';
import { AudioService } from '../../services/audio.service';
import { ConfirmService } from '../../services/confirm.service';
import { StorageService } from '../../services/storage.service';
import { resolve, display } from '../../domain/atomic';

const STORAGE_KEY = 'github.com/masaxsuzu/bingo/v3.2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  interval = 50;
  title = 'bingo';
  max = 0;
  current: number;
  numbers: string[];
  items: any[][];
  running: boolean;

  constructor(
    readonly viewContainerRef: ViewContainerRef,
    readonly audioService: AudioService,
    readonly confirmService: ConfirmService,
    readonly storageService: StorageService,
    readonly spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    const x = this.storageService.load(STORAGE_KEY) || {};
    const c = x.current;
    const n = x.numbers;
    const i = x.items;
    const m = x.max;
    this.current = !!c ? c : 0;
    this.max = !!m ? m : parseParams().max;
    this.numbers = !!n ? n : Object.keys(this.trimNumbers(resolve)).sort((a, b) => uuid() > uuid() ? 1 : -1);
    this.items = !!i ? i : init(this.max);
    this.running = false;
  }

  format: (n: number) => string = (n) => {
    return padLeft(`${n}`, 0, 3);
  }

  display: (n: number) => string = (n) => {
    const y = parseInt(resolve[this.numbers[n - 1]], 10);
    const x = display[y];
    return !!x ? `${x}${y}` : 'MS';
  }

  displayFromIndex: (i: number) => string = (i) => {
    const x = display[i];
    return !!x ? x : 'MS';
  }

  async start(): Promise<void> {
    if (this.running) {
      return;
    }

    if (this.current >= this.numbers.length) {
      return;
    }

    this.spinnerService.show();

    const n = this.current;
    this.running = true;
    this.audioService.start();

    // roulette 5s.
    await Promise.all(range(1, 100).map(x => this.roulette(x * this.interval)));

    this.audioService.stop();

    this.running = false;

    this.current = n + 1;
    const mayBeNumber = this.numbers[this.current - 1];

    const i = parseInt(mayBeNumber, 10) - 1;
    const row = Math.floor(i / 18);
    const col = i % 18;
    this.items[row][col].active = true;
    this.storageService.save(STORAGE_KEY,
      {
        current: this.current,
        numbers: this.numbers,
        items: this.items,
        max: this.max,
      });

    this.spinnerService.hide();

  }

  async reset(): Promise<void> {
    if (this.running) {
      return;
    }
    this.running = true;
    const ok = await this.confirmService.openModal(
      this.viewContainerRef ,
      { title: 'Danger!', contents: 'Do you really want to reset the result?', class: 'modal' }).toPromise();

    if (ok === 'OK' ) {
        this.storageService.save(STORAGE_KEY, {});
        this.initialize();
    }

    this.running = false;
  }

  async roulette(milleSeconds: number): Promise<void> {
    await sleep(milleSeconds);
    this.current = Math.floor((Math.random() * (this.max - 1)) + 0);
  }

  private trimNumbers(numbers: any): any {
    const data = {};
    Object.keys(numbers).forEach(key => {
      const n = Number.parseInt(numbers[key], 10);
      if (n <= this.max) {
        data[`${key}`] = n;
      }
    });
    return data;
  }
}

const sleep: (msec: number) => Promise<void> = msec => new Promise(_ => setTimeout(_, msec));

const init = (max: number) =>  {
  const m = range(1, 163).map(x => {
  return resolve[x] && resolve[x] <= max
    ? {
      n: resolve[x],
      active: false,
    }
    : {
      n: '---',
      active: 'none',
    };
  });

  return range(0, 9).map(i => {
    return m.slice(i * 18, i * 18 + 18);
  });
};

const range = (from: number, to: number) => [...Array(to - from)].map((_, i) => (from + i));

const padLeft = (val: string, char: number, n: number) => {
  for (; val.length < n; val = `${char}` + val) { }
  return val;
};

const parseParams = () => {
  const params = new URLSearchParams(window.location.search);
  // max is at most 111.
  return {
    max: Math.min(parseInt(params.get('max'), 10) || 111, 111),
  };
};
