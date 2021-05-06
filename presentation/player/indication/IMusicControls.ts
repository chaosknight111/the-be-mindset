import {MusicControlsState} from './MucicControlsState';
import TrackInfo from 'presentation/player/TrackInfo';

export default interface IMusicControls {
  setTrack(info: TrackInfo | undefined): void;
  setState(state: MusicControlsState): void;
}
