import Section from 'entities/Section';
import Document from 'entities/Document';
import ExternalLink from 'entities/ExternalLink';

export interface IBeMindsetApi {
  getSections(): Promise<Section[]>;
  getDocument(key: string): Promise<Document | undefined>;
  getExternalLinks(): Promise<ExternalLink[]>;
}
