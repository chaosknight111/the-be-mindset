import IMusicControls from './IMusicControls';
import MusicControl from 'react-native-music-control';
import MusicControlsCallbacks from './MusicControlsCallbacks';
import {Command} from 'react-native-music-control/lib/types';
import {MusicControlsState} from './MucicControlsState';
import TrackInfo from 'presentation/player/TrackInfo';

export default class MusicControls implements IMusicControls {
  static initialize() {
    MusicControl.stopControl();
  }

  private trackInfo?: TrackInfo;

  public constructor(private callbacks: MusicControlsCallbacks) {}

  onPause() {
    this.callbacks.onPause();
  }

  onPlay() {
    this.callbacks.onPlay();
  }

  setTrack(info: TrackInfo | undefined) {
    this.trackInfo = info;
  }

  setState(state: MusicControlsState) {
    switch (state) {
      case MusicControlsState.pause:
        MusicControl.enableControl(Command.play, true);
        MusicControl.enableControl(Command.pause, true);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PAUSED,
        });
        return;
      case MusicControlsState.play:
        MusicControl.enableControl(Command.pause, true);
        MusicControl.enableControl(Command.play, true);

        MusicControl.on(Command.pause, () => this.onPause());
        MusicControl.on(Command.play, () => this.onPlay());

        MusicControl.setNowPlaying({
          duration: undefined,
          title: this.trackInfo ? this.trackInfo.trackName : undefined,
          artist: this.trackInfo ? this.trackInfo.artist : undefined,
          artwork: this.trackInfo ? this.trackInfo.artwork : undefined,
        });
        MusicControl.updatePlayback({
          elapsedTime: 0,
          state: MusicControl.STATE_PLAYING,
        });
        return;
      case MusicControlsState.stop:
        MusicControl.enableControl(Command.pause, true);
        MusicControl.enableControl(Command.play, true);
        MusicControl.updatePlayback({
          elapsedTime: 0,
          state: MusicControl.STATE_STOPPED,
        });
        MusicControl.stopControl();
    }
  }
}
