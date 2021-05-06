import {
  ColorObject,
  ImageObject,
  ObjectKeys,
  ObjectConstants,
} from 'data/api/entities/CommonObjects';
import ApiMeditation from 'data/api/entities/Meditation';

export default interface ApiSection {
  _id: string;
  section_title: string;
  section_subtitle: string;
  section_order: number;
  section_type: string;
  section_image: ImageObject;
  section_text_color: ColorObject;
  meditation_list: ApiMeditation[];
}

export class SectionKeys extends ObjectKeys {
  section_title = 'section_title';

  section_subtitle = 'section_subtitle';

  section_order = 'section_order';

  section_type = 'section_type';

  section_image = 'section_image';

  section_text_color = 'section_text_color';

  meditation_list = 'meditation_list';

  get all() {
    return [
      ...super.all,
      this.section_title,
      this.section_subtitle,
      this.section_order,
      this.section_type,
      this.section_image,
      this.section_text_color,
      this.meditation_list,
    ];
  }
}

export class SectionConstants extends ObjectConstants {
  type = 'section';
}
