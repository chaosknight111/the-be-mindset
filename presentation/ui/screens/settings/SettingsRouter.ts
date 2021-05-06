import {AnalyticsTracker} from 'domain/analytics';

export default class SettingsRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({key: 'settings'});
  };
}
