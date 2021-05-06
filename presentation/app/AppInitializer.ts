import Localization from 'presentation/localization/Localization';
import translations from 'resources/Translations.json';
import StoreInitializer from 'data/store/StoreInitializer';
import AudioPlayerInitializer from 'presentation/player/AudioPlayerInitializer';
import {initializeServicesAsync, SubscriptionService} from 'presentation/services';
import {UpdateManager} from 'domain/managers';
import {AnalyticsTracker, initializeAnalyticsAsync} from 'domain/analytics';
import {state} from 'data/store';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default {
  initAsync: async () => {
    await StoreInitializer.initAsync();

    await initializeAnalyticsAsync();

    await Localization.initAsync(translations);

    await AudioPlayerInitializer.initAsync();

    await initializeServicesAsync();

    await UpdateManager.updateSections();
    await UpdateManager.updateExternalLinks();

    SubscriptionService.restoreSubscriptions()
      .then()
      .catch();

    await AnalyticsTracker.identifyAnonymous(
      `${DeviceInfo.getUniqueIdSync() || state.uniqueAppId} ${Platform.OS}`,
    );

    await AnalyticsTracker.trackAppOpened();

    state.setLastTimeShownSubscriptionModal(undefined);
  },
};
