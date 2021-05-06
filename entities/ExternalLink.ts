import {ImageRef} from 'entities/Common';

export default class ExternalLink {
  readonly id: string;

  readonly title: string;

  readonly order: number;

  readonly icon: ImageRef;

  readonly background: ImageRef;

  readonly linkUrl: string;

  readonly useInAppBrowser: 'internal' | 'external';

  constructor(
    id: string,
    title: string,
    order: number,
    icon: ImageRef,
    background: ImageRef,
    url: string,
    useInAppBrowser: 'internal' | 'external',
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.icon = icon;
    this.background = background;
    this.linkUrl = url;
    this.useInAppBrowser = useInAppBrowser;
  }

  static Fields = {
    order: 'order',
  };
}
