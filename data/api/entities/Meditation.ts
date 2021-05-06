import {
  ImageObject,
  ObjectKeys,
  ObjectConstants,
  TrackObject,
} from 'data/api/entities/CommonObjects';

export default interface Meditation {
  _key: string;
  meditation_title: string;
  meditation_subtitle: string;
  meditation_background: ImageObject;
  meditation_track: TrackObject;
}

export class MeditationKeys extends ObjectKeys {}

export class MeditationValues extends ObjectConstants {
  type = 'meditation';
}
