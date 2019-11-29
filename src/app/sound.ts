export class SoundController {
  drumRollAudio: HTMLAudioElement;
  cymbalAudio: HTMLAudioElement;
  onEnded;
  constructor(drumRollSrc, cymbalSrc) {
    this.drumRollAudio = new Audio(drumRollSrc);
    this.cymbalAudio = new Audio(cymbalSrc);
    this.onEnded = null;
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
