import {ImageRef, TrackRef} from 'entities/Common';

export default class Meditation {
  readonly id: string;

  readonly sectionId: string;

  readonly title: string;

  readonly subtitle: string;

  readonly image: ImageRef;

  readonly track: TrackRef;

  constructor(
    id: string,
    sectionId: string,
    title: string,
    subtitle: string,
    image: ImageRef,
    track: TrackRef,
  ) {
    this.id = id;
    this.sectionId = sectionId;
    this.title = title;
    this.subtitle = subtitle;
    this.image = image;
    this.track = track;
  }
}
