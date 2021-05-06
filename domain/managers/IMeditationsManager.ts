import Meditation from 'entities/Meditation';
import Section from 'entities/Section';
import {OfflineTrackRef} from 'entities/Common';

export default interface IMeditationsManager {
  getSection(meditation: Meditation): Section | undefined;

  isFavorite(meditation: Meditation): boolean;
  isAvailableOffline(meditation: Meditation): boolean;
  offlineTrack(meditation: Meditation): OfflineTrackRef | undefined;

  getOfflineMeditations(): Meditation[];
  setIsAvailableOffline(
    section: Section,
    meditation: Meditation,
    isAvailableOffline: boolean,
  ): Promise<void>;

  getFavouriteMeditations(): Meditation[];
  setIsFavorite(
    section: Section,
    meditation: Meditation,
    isFavorite: boolean,
  ): Promise<void>;
}
