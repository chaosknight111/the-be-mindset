import {AnalyticsTracker} from 'domain/analytics';

export default class SubscribeRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({
      key: 'subscribe',
    });
  };
}
