import Track from './Track';

export interface PlaybackTime {
  duration?: number;
  position: number;
}

export interface PlaybackStatus {
  isLoaded: boolean;
  shouldPlay: boolean;
  track: Track;
  time: PlaybackTime | undefined;
}

export default interface AudioPlayerCallbacks {
  onPlaybackStatusChanged?(status: PlaybackStatus): void;
  onTrackFinished?(track: Track): void;
}

export interface IAudioPlayerCallbacksCollection {
  addCallbacks(callbacks: AudioPlayerCallbacks): void;
  removeCallbacks(callbacks: AudioPlayerCallbacks): void;
}

export class AudioPlayerCallbacksCollection
  implements IAudioPlayerCallbacksCollection, AudioPlayerCallbacks {
  private callbacks: AudioPlayerCallbacks[] = [];

  addCallbacks(callbacks: AudioPlayerCallbacks) {
    this.callbacks.push(callbacks);
  }

  removeCallbacks(callbacks: AudioPlayerCallbacks) {
    const index = this.callbacks.indexOf(callbacks);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  onPlaybackStatusChanged(status: PlaybackStatus) {
    this.callbacks.forEach((c) => {
      if (!c.onPlaybackStatusChanged) return;
      c.onPlaybackStatusChanged(status);
    });
  }

  onTrackFinished(track: Track) {
    this.callbacks.forEach((c) => {
      if (!c.onTrackFinished) return;
      c.onTrackFinished(track);
    });
  }
}
