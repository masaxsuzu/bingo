import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfirmService {
  constructor() { }
  run(message: string): boolean {
    return confirm(message);
  }
}


