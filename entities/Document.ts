export default class Document {
  readonly title: string;

  readonly key: string;

  readonly markdownText: string;

  constructor(title: string, key: string, markdownText: string) {
    this.title = title;
    this.key = key;
    this.markdownText = markdownText;
  }
}
