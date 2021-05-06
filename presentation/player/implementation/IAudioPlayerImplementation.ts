export default interface IAudioPlayerImplementation {
  setSource(uri: string, fileUri?: string): Promise<boolean>;
  play(): Promise<boolean>;
  pause(): Promise<boolean>;
  stop(): Promise<boolean>;
  replay(): Promise<boolean>;
  seekToPercent(percent: number): Promise<boolean>;
}
