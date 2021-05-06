export default class OfflineMeditation {
  readonly id: string;

  readonly sectionId: string;

  readonly fileUri: string;

  constructor(id: string, sectionId: string, fileUri: string) {
    this.id = id;
    this.sectionId = sectionId;
    this.fileUri = fileUri;
  }
}
