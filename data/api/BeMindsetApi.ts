import Section from 'entities/Section';
import {IBeMindsetApi} from './IBeMindsetApi';
import ApiSection from './entities/Section';
import {
  getDocumentQuery,
  getSectionsQuery,
  getExternalLinkQuery,
} from './BeMindsetQueryBuilder';
import BeMindsetApiBase from 'data/api/base/BeMindsetApiBase';
import ApiDocument from './entities/Document';
import Document from 'entities/Document';
import ApiExternalLink from './entities/ExternalLink';
import ExternalLink from 'entities/ExternalLink';

export default class BeMindsetApi extends BeMindsetApiBase implements IBeMindsetApi {
  public async getSections(): Promise<Section[]> {
    const {query, params} = getSectionsQuery();
    const sections = await this.fetch<ApiSection[]>(query, params);
    return this.mappers.mapFromApiSections(sections);
  }

  public async getDocument(key: string): Promise<Document | undefined> {
    const {query, params} = getDocumentQuery(key);
    const document = await this.fetch<ApiDocument[]>(query, params).then<
      ApiDocument | undefined
    >((response) => (response.length > 0 ? response[0] : undefined));
    return document ? this.mappers.mapFromApiDocument(document) : undefined;
  }

  public async getExternalLinks(): Promise<ExternalLink[]> {
    const {query, params} = getExternalLinkQuery();
    const externalLinks = await this.fetch<ApiExternalLink[]>(query, params);
    return this.mappers.mapFromApiExternalLinks(externalLinks);
  }
}
