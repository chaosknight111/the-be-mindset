import TrackInfo from 'presentation/player/TrackInfo';

export default class Track {
  constructor(
    public uri: string,
    public fileUri: string | undefined,
    public info: TrackInfo,
    public tag: any,
  ) {}
}
