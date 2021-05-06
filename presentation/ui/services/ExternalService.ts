import IExternalService from 'presentation/ui/services/IExternalService';
import Rate, {AndroidMarket, IConfig} from 'react-native-rate';
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class ExternalService implements IExternalService {
  private AppleAppID = '1471691864';

  private GooglePackageName = 'com.android.chrome';

  async requestAppReview() {
    try {
      const config = {
        AppleAppID: this.AppleAppID,
        GooglePackageName: this.GooglePackageName,
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp: true,
        openAppStoreIfInAppFails: true,
      };
      await ExternalService.rateAsync(config);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static rateAsync(config: IConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      Rate.rate(config, (success) => {
        if (success) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async openLink(url: string, useInAppBrowser: 'internal' | 'external') {
    try {
      if (useInAppBrowser === 'internal' && (await InAppBrowser.isAvailable())) {
        await InAppBrowser.open(url);
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
