import {action, computed, observable} from 'mobx';
import uuid from 'uuid/v4';
import Section from 'entities/Section';
import OfflineMeditation from 'entities/OfflineMeditation';
import FavoriteMeditation from 'entities/FavoriteMeditation';
import Document from 'entities/Document';
import Subscription, {SubscriptionType} from 'entities/Subscription';
import ExternalLink from 'entities/ExternalLink';

export default class State {
  @action init() {
    // FIXME: find a way to initialize mobx object
    // noinspection BadExpressionStatementJS
    this.sections;
  }

  @observable uniqueAppId: string = uuid();

  @observable sections: Section[] = [];

  @observable selectedSectionId: string | null = null;

  @observable offlineMeditations: OfflineMeditation[] = [];

  @observable favoriteMeditations: FavoriteMeditation[] = [];

  @action setSelectedSectionId = (id: string) => {
    this.selectedSectionId = id;
  };

  @action setLastTimeShownSubscriptionModal = (time: number | undefined) => {
    this.lastTimeShownSubscriptionModal = time;
  };

  @computed get selectedSectionIndex(): number {
    const id = this.selectedSectionId;
    const {sections} = this;
    if (!id) return 0;

    const index = sections.findIndex((s) => s.id === id);
    if (index < 0) return 0;

    return index;
  }

  @observable externalLinks: ExternalLink[] = [];

  @observable documents = new Map<string, Document>();

  @observable subscriptions: Subscription[] = [];

  @observable selectedSubscription?: SubscriptionType;

  @observable lastUpdated: number | undefined;

  @observable lastTimeShownSubscriptionModal: number | undefined;

  @observable quantityOpenedMeditations: number = 0;
}
