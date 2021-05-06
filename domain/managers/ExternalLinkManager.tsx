import IExternalLinkManager from 'domain/managers/IExternalLinkManager';
import ExternalLink from 'entities/ExternalLink';
import {action} from 'mobx';
import {state} from 'data/store';
import {IBeMindsetApi} from 'data/api/IBeMindsetApi';
import _ from 'lodash';

export default class ExternalLinkManager implements IExternalLinkManager {
  constructor(private api: IBeMindsetApi) {}

  async loadExternalLinks() {
    const externalLinks = await this.api.getExternalLinks();
    this.setExternalLink(_.orderBy(externalLinks, [ExternalLink.Fields.order]));
  }

  @action
  private setExternalLink(externalLinks: ExternalLink[]) {
    state.externalLinks = externalLinks;
  }
}
