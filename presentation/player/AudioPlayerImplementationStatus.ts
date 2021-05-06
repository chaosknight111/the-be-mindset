export interface AudioPlayerImplementationStatus {
  isLoaded: boolean;
  shouldPlay: boolean;
  durationMillis: number | undefined;
  positionMillis: number;
}
