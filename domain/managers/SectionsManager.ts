import ISectionsManager from './ISectionsManager';
import {IBeMindsetApi} from 'data/api/IBeMindsetApi';
import {state} from 'data/store';
import Section, {SectionType} from 'entities/Section';
import {action} from 'mobx';
import _ from 'lodash';
import {CancelablePromise, makeCancelable} from 'domain/utils/CancelablePromise';
import DateUtils from 'domain/utils/DateUtils';

export default class SectionsManager implements ISectionsManager {
  private loadSectionsPromise?: CancelablePromise<Section[]>;

  constructor(private api: IBeMindsetApi) {}

  async loadSections(): Promise<void> {
    this.cancelLoadSections();

    this.loadSectionsPromise = makeCancelable(this.api.getSections());

    try {
      const sections = await this.loadSectionsPromise.promise;

      this.setSections(_.orderBy(sections, [Section.Fields.order]));
    } catch (e) {
      console.log(e);
    }
  }

  private cancelLoadSections() {
    if (this.loadSectionsPromise) {
      this.loadSectionsPromise.cancel();
      this.loadSectionsPromise = undefined;
    }
  }

  @action
  private setSections(sections: Section[]) {
    state.sections = sections;
    state.lastUpdated = DateUtils.getCurrentMS();
  }

  isLocked(section: Section): boolean {
    return section.type !== SectionType.free && state.selectedSubscription === undefined;
  }
}
