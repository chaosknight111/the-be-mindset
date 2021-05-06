export enum SubscriptionType {
  lifelong,
  monthly,
  yearlyWithTrial,
  yearlyOld,
}

export default class Subscription {
  readonly localizedPrice: string;

  readonly description: string;

  readonly subscriptionType: SubscriptionType;

  constructor(
    localizedPrice: string,
    description: string,
    subscriptionType: SubscriptionType,
  ) {
    this.localizedPrice = localizedPrice;
    this.description = description;
    this.subscriptionType = subscriptionType;
  }
}
