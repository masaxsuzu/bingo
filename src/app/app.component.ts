import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid'
import { NumberSymbol } from '@angular/common';
import { resolve, display } from '../periodic/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {

  title: string = 'bingo';
  current: number;
  numbers: string[];
  items: any[]

  constructor() {
    this.init();
  }

  init(): void {
    this.current = 0;
    this.numbers = Object.keys(resolve).sort((a, b) => uuid() > uuid() ? 1 : -1);
    this.items = init();
  }

  format: (n: number) => string = (n) => {
    return padLeft(`${n}`, 0, 3);
  };

  display: (n: number) => string = (n) => {
    const y = parseInt(resolve[this.numbers[n - 1]]);
    const x = display[y];
    return !!x ? x : "MS";
  }

  start(): void {
    if (this.current >= this.numbers.length) {
      return;
    }

    this.current++;
    const x = this.current;
    const y = this.numbers[x - 1];
    const z = parseInt(y);
    this.items[z - 1].active = true;
  }

  reset(): void {
    this.init();
  }
}

const init = () => range(1, 163).map(x => {
  return resolve[x]
    ? {
      n: resolve[x],
      active: false,
    }
    : {
      n: "---",
      active: "none",
    }
});

const range = (from: number, to: number) => [...Array(to - from)].map((_, i) => (from + i));

const padLeft = (val: string, char: number, n: number) => {
  for (; val.length < n; val = `${char}` + val);
  return val;
}