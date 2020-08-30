import { AudioService } from './audio.service';

describe('AudioService', () => {
  it('should stop', () => {
    const audio = new AudioService('assets/drumroll.ogg', 'assets/cymbal.ogg');

    audio.start();
    audio.drumRollAudio.currentTime = 100;
    audio.stop();
    expect(audio.drumRollAudio.currentTime).toBe(0);
  });
});
