import Subscription, {SubscriptionType} from 'entities/Subscription';

export default interface ISubscriptionService {
  restoreSubscriptions(): Promise<void>;

  buySubscription(type: SubscriptionType): Promise<void>;

  getSelectedSubscription(): Subscription | undefined;
}
