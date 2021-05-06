import {ObjectKeys, ObjectConstants, ImageObject} from 'data/api/entities/CommonObjects';

export default interface ExternalLink {
  _id: string;
  externalLink_title: string;
  externalLink_order: number;
  externalLink_icon: ImageObject;
  externalLink_background: ImageObject;
  externalLink_url: string;
  externalLink_useInAppBrowser: 'internal' | 'external';
}

export class ExternalLinkKeys extends ObjectKeys {
  title = 'externalLink_title';

  order = 'externalLink_order';

  icon = 'externalLink_icon';

  background = 'externalLink_background';

  url = 'externalLink_url';

  useInAppBrowser = 'externalLink_useInAppBrowser';

  get all() {
    return [
      ...super.all,
      this.title,
      this.order,
      this.icon,
      this.background,
      this.url,
      this.useInAppBrowser,
    ];
  }
}

export class ExternalLinkConstants extends ObjectConstants {
  type = 'externalLinks';
}
