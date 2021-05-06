import Track from 'presentation/player/Track';
import {IAudioPlayerCallbacksCollection} from 'presentation/player/AudioPlayerCallbacks';

export default interface IAudioPlayer extends IAudioPlayerCallbacksCollection {
  setTrack(track: Track): Promise<boolean>;
  getTrack(): Track | undefined;

  play(): Promise<boolean>;
  pause(): Promise<boolean>;
  replay(): Promise<boolean>;
  stop(): Promise<boolean>;

  seekToPercent(percent: number): Promise<boolean>;
}
