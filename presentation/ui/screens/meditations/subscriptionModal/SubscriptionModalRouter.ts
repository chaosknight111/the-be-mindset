import {AnalyticsTracker} from 'domain/analytics';

export default class SubscriptionModalRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({
      key: 'subscriptionModal',
    });
  };
}
