import {Page} from './Pages';
import {MeditationAction} from './MeditationActions';
import {Button} from './Buttons';
import {Subscription} from './Subscriptions';

export default interface IAnalyticsTracker {
  identifyAnonymous(id: string): Promise<void>;
  trackAppOpened(): Promise<void>;
  trackPageOpened(page: Page): Promise<void>;
  trackMeditationAction(meditationAction: MeditationAction): Promise<void>;
  trackButtonClicked(button: Button): Promise<void>;
  trackSubscription(subscription: Subscription): Promise<void>;
}
