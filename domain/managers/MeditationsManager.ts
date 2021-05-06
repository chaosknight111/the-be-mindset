import IMeditationsManager from './IMeditationsManager';
import Meditation from 'entities/Meditation';
import {FileStorage} from 'data/files/index';
import {action} from 'mobx';
import OfflineMeditation from 'entities/OfflineMeditation';
import {state} from 'data/store';
import FavoriteMeditation from 'entities/FavoriteMeditation';
import Section from 'entities/Section';
import {OfflineTrackRef} from 'entities/Common';

export default class MeditationsManager implements IMeditationsManager {
  getSection(meditation: Meditation): Section | undefined {
    return state.sections.find((s) => s.id === meditation.sectionId);
  }

  isFavorite(meditation: Meditation): boolean {
    return !!state.favoriteMeditations.find((m) => m.id === meditation.id);
  }

  isAvailableOffline(meditation: Meditation): boolean {
    return !!state.offlineMeditations.find((m) => m.id === meditation.id);
  }

  offlineTrack(meditation: Meditation): OfflineTrackRef | undefined {
    const offlineMeditation = state.offlineMeditations.find((m) => m.id == meditation.id);
    return offlineMeditation ? {fileUri: offlineMeditation.fileUri} : undefined;
  }

  // region Available Offline
  async setIsAvailableOffline(
    section: Section,
    meditation: Meditation,
    isAvailableOffline: boolean,
  ) {
    if (isAvailableOffline) {
      const file = await FileStorage.cacheFileAsync(meditation.track.uri);
      const offlineMeditation: OfflineMeditation = {
        id: meditation.id,
        sectionId: section.id,
        fileUri: file.uri,
      };
      this.addAvailableOffline(offlineMeditation);
    } else {
      const offlineMeditation = state.offlineMeditations.find(
        (m) => m.id === meditation.id,
      );
      if (!offlineMeditation) return;

      try {
        await FileStorage.deleteFileAsync(offlineMeditation.fileUri);
      } catch (e) {
        console.log(e);
      }

      await this.removeAvailableOffline(offlineMeditation);
    }
  }

  getOfflineMeditations(): Meditation[] {
    return state.offlineMeditations
      .map((om) => {
        const section = state.sections.find((s) => s.id === om.sectionId);
        if (!section) return undefined;

        return section.meditations.find((m) => m.id === om.id);
      })
      .filter((m) => !!m)
      .map((m) => m as Meditation);
  }

  @action private addAvailableOffline = (offlineMeditation: OfflineMeditation) => {
    const found = state.offlineMeditations.find((x) => x.id === offlineMeditation.id);
    if (found) return;
    state.offlineMeditations.push(offlineMeditation);
  };

  @action private removeAvailableOffline = async (
    offlineMeditation: OfflineMeditation,
  ) => {
    const index = state.offlineMeditations.findIndex(
      (m) => m.id === offlineMeditation.id,
    );
    if (index < 0) return;
    state.offlineMeditations.splice(index, 1);
  };
  // endregion

  // region Favourite
  async setIsFavorite(section: Section, meditation: Meditation, isFavorite: boolean) {
    if (isFavorite) {
      const favoriteMeditation: FavoriteMeditation = {
        id: meditation.id,
        sectionId: section.id,
      };
      this.addToFavorite(favoriteMeditation);
    } else {
      const favoriteMeditation = state.favoriteMeditations.find(
        (m) => m.id === meditation.id,
      );
      if (!favoriteMeditation) return;

      await this.removeFromFavorite(favoriteMeditation);
    }
  }

  getFavouriteMeditations(): Meditation[] {
    return state.favoriteMeditations
      .map((om) => {
        const section = state.sections.find((s) => s.id === om.sectionId);
        if (!section) return undefined;

        return section.meditations.find((m) => m.id === om.id);
      })
      .filter((m) => !!m)
      .map((m) => m as Meditation);
  }

  @action private addToFavorite = (favoriteMeditation: FavoriteMeditation) => {
    const found = state.favoriteMeditations.find((m) => m.id === favoriteMeditation.id);
    if (found) return;
    state.favoriteMeditations.push(favoriteMeditation);
  };

  @action private removeFromFavorite = async (favoriteMeditation: FavoriteMeditation) => {
    const index = state.favoriteMeditations.findIndex(
      (m) => m.id === favoriteMeditation.id,
    );
    if (index < 0) return;
    state.favoriteMeditations.splice(index, 1);
  };

  // endregion
}
