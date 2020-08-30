import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AudioService {
  drumRollAudio: HTMLAudioElement;
  cymbalAudio: HTMLAudioElement;
  constructor(@Inject(String) drumRollSrc: string , @Inject(String) cymbalSrc: string) {
    this.drumRollAudio = new Audio(drumRollSrc);
    this.cymbalAudio = new Audio(cymbalSrc);
  }

  start(): void {
    this.drumRollAudio.play();
  }

  stop(): void {
    this.drumRollAudio.pause();
    this.drumRollAudio.currentTime = 0;
    this.cymbalAudio.play();
  }
}


