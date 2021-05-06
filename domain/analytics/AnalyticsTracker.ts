import {MixpanelInstance} from 'react-native-mixpanel';
import IAnalyticsTracker from './IAnalyticsTracker';
import {Event, getEventIdentifier} from './Events';
import {Page, getPageProperties} from './Pages';
import {MeditationAction, getMeditationActionProperties} from './MeditationActions';
import {Button, getButtonProperties} from './Buttons';
import {getSubscriptionProperties, Subscription} from './Subscriptions';

export default class AnalyticsTracker implements IAnalyticsTracker {
  constructor(private readonly mixpanel: MixpanelInstance) {}

  async identifyAnonymous(id: string): Promise<void> {
    const userId = `Anonymous ${id}`;
    await this.mixpanel.identify(userId);
    await this.mixpanel.set({$name: userId});
  }

  private async track(event: Event, properties?: Object) {
    await this.mixpanel.track(getEventIdentifier(event), properties);
  }

  async trackAppOpened() {
    await this.track('appOpened');
  }

  async trackPageOpened(page: Page) {
    await this.track('pageOpened', getPageProperties(page));
  }

  async trackMeditationAction(meditation: MeditationAction) {
    await this.track('meditationAction', getMeditationActionProperties(meditation));
  }

  async trackButtonClicked(button: Button) {
    await this.track('buttonClicked', getButtonProperties(button));
  }

  async trackSubscription(subscription: Subscription) {
    await this.track('subscription', getSubscriptionProperties(subscription));
  }
}
