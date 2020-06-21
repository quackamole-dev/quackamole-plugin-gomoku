import {Injectable, OnInit} from '@angular/core';
import {Howl} from 'howler'

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: Map<string, any> = new Map();

  constructor() { }

  init() {

    this.sounds.set('place stone', new Howl({ src: ['./assets/bounce.wav']}));
  }

  play(soundKey: string) {
    if (this.sounds.has(soundKey)) {
      const sound = this.sounds.get(soundKey);
      sound.load();
      sound.play();
    }
  }
}
