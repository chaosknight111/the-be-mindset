import {action, observable} from 'mobx';
import Meditation from 'entities/Meditation';

export default class MeditationsDataSource {
  constructor(private loadMeditation: () => Meditation[]) {}

  @observable meditations: Meditation[] = [];

  @action load() {
    this.meditations = this.loadMeditation();
  }
}
