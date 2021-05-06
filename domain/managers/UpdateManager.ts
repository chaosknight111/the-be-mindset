import IUpdateManager from 'domain/managers/IUpdateManager';
import DateUtils from 'domain/utils/DateUtils';
import {state} from 'data/store';
import ISectionsManager from 'domain/managers/ISectionsManager';
import IExternalLinkManager from 'domain/managers/IExternalLinkManager';

export default class UpdateManager implements IUpdateManager {
  private readonly timeToDiffMs = 24 * 60 * 60 * 1000;

  constructor(
    private readonly sectionManager: ISectionsManager,
    private readonly externalLinksManager: IExternalLinkManager,
  ) {}

  async updateSections() {
    const current = DateUtils.getCurrentMS();
    const {lastUpdated} = state;
    if (
      lastUpdated == undefined ||
      DateUtils.diffDateMS(current, lastUpdated) >= this.timeToDiffMs
    ) {
      await this.sectionManager.loadSections();
    }
  }

  async updateExternalLinks(): Promise<void> {
    await this.externalLinksManager.loadExternalLinks();
  }
}
