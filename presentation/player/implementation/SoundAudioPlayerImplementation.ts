import Sound from 'react-native-sound';
import IAudioPlayerImplementation from './IAudioPlayerImplementation';
import {AudioPlayerImplementationCallbacks} from '../AudioPlayerImplementationCallbacks';
import {PlaybackSource} from './PlaybackSource';
import {PlaybackStatus} from './PlaybackStatus';
import {CancelablePromise, makeCancelable} from 'domain/utils/CancelablePromise';

export default class SoundAudioPlayerImplementation
  implements IAudioPlayerImplementation {
  static async initialize() {
    Sound.setCategory('Playback', false);
  }

  constructor(private callbacks: AudioPlayerImplementationCallbacks) {}

  private soundPromise: CancelablePromise<Sound> | null = null;

  private sound: Sound | null = null;

  private callbackInterval: any | null = null;

  private source?: PlaybackSource;

  private createSound(audioURI: string): CancelablePromise<Sound> {
    return makeCancelable(
      new Promise((resolve, reject) => {
        const sound = new Sound(audioURI, '', (error) => {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }
          resolve(sound);
        });
      }),
    );
  }

  async setSource(uri: string, fileUri?: string) {
    await this.stop();
    this.source = {
      uri: fileUri || uri,
    };

    try {
      this.soundPromise = this.createSound(this.source.uri);
      this.sound = await this.soundPromise.promise;
      this.soundPromise = null;
    } catch (e) {
      return false;
    }

    return true;
  }

  async play() {
    const {sound} = this;
    if (!sound) return false;

    await this.setStatusChangeCallbackInterval(sound);
    await sound.play(() => this.onEnd(sound));
    return true;
  }

  async pause() {
    const {sound} = this;
    if (!sound) return false;

    await sound.pause();
    return true;
  }

  async isPlaying() {
    const {sound} = this;
    if (!sound) return false;
    return await sound.isPlaying();
  }

  async replay() {
    const {sound} = this;
    if (!sound) return false;
    await sound.setCurrentTime(0);
    await this.setStatusChangeCallbackInterval(sound);
    await sound.play(() => this.onEnd(sound));
    return true;
  }

  async stop() {
    if (this.soundPromise) {
      this.soundPromise.cancel();
      this.soundPromise = null;

      this.sound = null;

      return false;
    }

    const {sound} = this;
    if (!sound) return false;

    await this.clearStatusChangeCallbackInterval();

    this.sound = null;
    return SoundAudioPlayerImplementation.stop_(sound);
  }

  private static async stop_(sound: Sound) {
    await sound.release();
    return true;
  }

  public async seekToPercent(percent: number) {
    const {sound} = this;
    if (!sound) return false;
    if (!sound.isLoaded()) return false;

    const duration = sound.getDuration();
    await sound.setCurrentTime((duration * percent) / 100);

    return true;
  }

  private setStatusChangeCallbackInterval(sound: Sound) {
    this.clearStatusChangeCallbackInterval();

    this.callbackInterval = setInterval(async () => {
      sound.getCurrentTime(async (currentTime: number, isPlaying: boolean) => {
        let time = currentTime * 1000;
        const duration = sound.getDuration() * 1000;
        if (time > duration) time = duration;
        const status = {
          isLoaded: sound.isLoaded(),
          didJustFinish: duration - time <= 0,
          shouldPlay: isPlaying,
          positionMillis: time,
          durationMillis: duration,
        };

        await this.onPlaybackStatusUpdate(status);
      });
    }, 500);
  }

  private clearStatusChangeCallbackInterval() {
    if (this.callbackInterval) {
      clearInterval(this.callbackInterval);
      this.callbackInterval = null;
    }
  }

  private onPlaybackStatusUpdate(status: PlaybackStatus) {
    this.callbacks.statusChanged({
      isLoaded: status.isLoaded,
      shouldPlay: status.shouldPlay,
      durationMillis: status.durationMillis,
      positionMillis: status.positionMillis,
    });
  }

  private onEnd(sound: Sound) {
    if (sound !== this.sound) return;

    sound.setCurrentTime(0);

    if (this.callbacks) {
      this.callbacks.didJustFinish();
    }
  }
}
