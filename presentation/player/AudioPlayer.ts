import IAudioPlayer from './IAudioPlayer';
import Track from './Track';
import AudioPlayerCallbacks, {
  AudioPlayerCallbacksCollection,
  PlaybackTime,
} from './AudioPlayerCallbacks';
import AudioPlayerImplementation from 'presentation/player/implementation/AudioPlayerImplementation';
import {AudioPlayerImplementationCallbacks} from './AudioPlayerImplementationCallbacks';
import {AudioPlayerImplementationStatus} from './AudioPlayerImplementationStatus';
import IMusicControls from 'presentation/player/indication/IMusicControls';
import {MusicControlsState} from './indication/MucicControlsState';
import MusicControlsCallbacks from 'presentation/player/indication/MusicControlsCallbacks';
import MusicControls from './indication/MusicControls';
import IAudioPlayerImplementation from 'presentation/player/implementation/IAudioPlayerImplementation';

export default class Player implements IAudioPlayer, AudioPlayerImplementationCallbacks {
  private readonly player: IAudioPlayerImplementation;

  private readonly callbacks: AudioPlayerCallbacksCollection;

  private readonly musicControls: IMusicControls;

  private track?: Track;

  constructor() {
    this.player = new AudioPlayerImplementation(this);
    this.callbacks = new AudioPlayerCallbacksCollection();
    this.musicControls = new MusicControls(this.musicControlsCallbacks);
  }

  async setTrack(track: Track) {
    console.log('setTrack()');
    const result = await this.player.setSource(track.uri, track.fileUri);
    if (!result) {
      console.log('setTrack: false');
      return false;
    }

    this.track = track;
    this.musicControls.setTrack(track.info);
    console.log('setTrack: true');
    return true;
  }

  getTrack() {
    return this.track;
  }

  async play() {
    this.musicControls.setState(MusicControlsState.play);
    return await this.player.play();
  }

  async pause() {
    this.musicControls.setState(MusicControlsState.pause);
    return await this.player.pause();
  }

  async replay() {
    return await this.player.replay();
  }

  async stop() {
    this.musicControls.setState(MusicControlsState.stop);
    return await this.player.stop();
  }

  async seekToPercent(percent: number): Promise<boolean> {
    this.musicControls.setState(MusicControlsState.play);
    return await this.player.seekToPercent(percent);
  }

  addCallbacks(callbacks: AudioPlayerCallbacks) {
    this.callbacks.addCallbacks(callbacks);
  }

  removeCallbacks(callbacks: AudioPlayerCallbacks) {
    this.callbacks.removeCallbacks(callbacks);
  }

  didJustFinish() {
    if (this.callbacks) {
      if (this.track) {
        this.callbacks.onTrackFinished(this.track);
        this.musicControls.setState(MusicControlsState.pause);
      }
    }
  }

  statusChanged(status: AudioPlayerImplementationStatus) {
    if (this.callbacks) {
      if (this.track) {
        const time: PlaybackTime = {
          position: status.positionMillis,
          duration: status.durationMillis,
        };
        this.callbacks.onPlaybackStatusChanged({
          shouldPlay: status.shouldPlay,
          isLoaded: status.isLoaded,
          track: this.track,
          time,
        });
      }
    }
  }

  private readonly musicControlsCallbacks: MusicControlsCallbacks = {
    onPause: async () => {
      await this.pause();
    },
    onPlay: async () => {
      await this.play();
    },
  };
}
