import {AudioPlayerImplementationStatus} from './AudioPlayerImplementationStatus';

export interface AudioPlayerImplementationCallbacks {
  statusChanged(status: AudioPlayerImplementationStatus): void;
  didJustFinish(): void;
}
