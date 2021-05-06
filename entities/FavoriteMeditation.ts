export default class FavoriteMeditation {
  readonly id: string;

  readonly sectionId: string;

  constructor(id: string, sectionId: string) {
    this.id = id;
    this.sectionId = sectionId;
  }
}
