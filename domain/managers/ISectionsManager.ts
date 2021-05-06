import Section from 'entities/Section';

export default interface ISectionsManager {
  loadSections(): Promise<void>;
  isLocked(section: Section): boolean;
}
