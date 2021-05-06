import SanityClient from 'data/api/sanity/SanityClient';
import Section, {SectionType} from 'entities/Section';
import {ColorObject, ImageObject, TrackObject} from 'data/api/entities/CommonObjects';
import ApiSection from 'data/api/entities/Section';
import Meditation from 'entities/Meditation';
import ApiMeditation from 'data/api/entities/Meditation';
import {ImageRef, TrackRef} from 'entities/Common';
import ApiDocument from 'data/api/entities/Document';
import Document from 'entities/Document';
import ApiExternalLink from 'data/api/entities/ExternalLink';
import ExternalLink from 'entities/ExternalLink';

export default class Mappers {
  constructor(private client: SanityClient) {}

  public mapFromApiSections = (sections: ApiSection[]): Section[] =>
    sections.map(this.mapToSection);

  private mapToSection = (section: ApiSection): Section => ({
    id: section._id,
    title: section.section_title,
    subtitle: section.section_subtitle,
    order: section.section_order,
    type: this.mapFromApiCategoryType(section.section_type),
    image: this.mapFromApiImage(section.section_image),
    textColor: this.mapFromApiColor(section.section_text_color),

    meditations: this.mapFromApiMeditationList(section, section.meditation_list),
  });

  private mapFromApiMeditationList = (
    section: ApiSection,
    meditations: ApiMeditation[],
  ): Meditation[] => {
    if (meditations === undefined) return [];
    return meditations.map((meditation) => this.mapToMeditation(section, meditation));
  };

  private mapToMeditation = (section: ApiSection, meditation: ApiMeditation) =>
    new Meditation(
      meditation._key,
      section._id,
      meditation.meditation_title,
      meditation.meditation_subtitle,
      this.mapFromApiImage(meditation.meditation_background),
      this.mapFromApiTrack(meditation.meditation_track),
    );

  private mapFromApiImage = (image: ImageObject): ImageRef => ({
    uri: this.client.urlForImage(image.asset._ref),
  });

  private mapFromApiTrack = (track: TrackObject): TrackRef => {
    return {uri: this.client.urlForTrack(track.asset._ref)};
  };

  private mapFromApiColor = (color: ColorObject): string => color.hex;

  public mapFromApiDocument = (document: ApiDocument): Document => ({
    title: document.document_title,
    key: document.document_key,
    markdownText: this.client.markdownForBlock(document.document_text),
  });

  private mapFromApiCategoryType = (sectionType: string): SectionType => {
    switch (sectionType) {
      case 'license':
        return SectionType.license;
      case 'free':
      default:
        return SectionType.free;
    }
  };

  public mapFromApiExternalLinks = (externalLinks: ApiExternalLink[]): ExternalLink[] =>
    externalLinks.map(this.mapFromApiExternalLink);

  public mapFromApiExternalLink = (externalLink: ApiExternalLink): ExternalLink => {
    return {
      id: externalLink._id,
      title: externalLink.externalLink_title,
      order: externalLink.externalLink_order,
      icon: this.mapFromApiImage(externalLink.externalLink_icon),
      background: this.mapFromApiImage(externalLink.externalLink_background),
      linkUrl: externalLink.externalLink_url,
      useInAppBrowser: externalLink.externalLink_useInAppBrowser,
    };
  };
}
