import {Color, ImageRef} from './Common';
import {observable} from 'mobx';
import Meditation from 'entities/Meditation';

export default class Section {
  readonly id: string;

  readonly title: string;

  readonly subtitle: string;

  readonly order: number;

  readonly type: SectionType;

  readonly image: ImageRef;

  readonly textColor: Color;

  @observable meditations: Meditation[];

  constructor(
    id: string,
    title: string,
    subtitle: string,
    order: number,
    type: SectionType,
    image: ImageRef,
    textColor: Color,
    meditations: Meditation[],
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.order = order;
    this.type = type;
    this.image = image;
    this.textColor = textColor;

    this.meditations = meditations;
  }

  static Fields = {
    order: 'order',
  };
}

export enum SectionType {
  free,
  license,
}
