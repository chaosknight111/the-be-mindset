import {SubscriptionType} from 'entities/Subscription';
import {getSubscriptionTypeMetadata} from './Metadata';

type SubscriptionProperties = {
  Action: string;
};

const SubscriptionKeys = {
  purchasesRestored: 'Purchases restored',
  payed: 'Subscription Payed',
  error: 'Subscription Error',
};

type PurchasesRestored = {
  key: 'purchasesRestored';
  selectedSubscription: SubscriptionType | undefined;
  rawPurchases: object;
};

type SubscriptionPayed = {
  key: 'payed';
  subscription: SubscriptionType | undefined;
  rawPurchase: object;
};

type SubscriptionPaymentError = {
  key: 'error';
  errorMessage: string | undefined;
  errorCode: string | undefined;
  rawError: object;
};

export type Subscription =
  | PurchasesRestored
  | SubscriptionPayed
  | SubscriptionPaymentError;

const getMetadata = (subscription: Subscription) => {
  switch (subscription.key) {
    case 'purchasesRestored':
      return {
        'Raw purchases': subscription.rawPurchases,
        'Selected subscription': getSubscriptionTypeMetadata(
          subscription.selectedSubscription,
        ),
      };
    case 'payed':
      return {
        'Subscription': getSubscriptionTypeMetadata(subscription.subscription),
        'Raw purchase': subscription.rawPurchase,
      };
    case 'error':
      return {
        'Error message': subscription.errorMessage,
        'Raw error': subscription.rawError,
      };
    default:
      return undefined;
  }
};

export const getSubscriptionProperties = (
  subscription: Subscription,
): SubscriptionProperties => {
  return {
    Action: SubscriptionKeys[subscription.key],
    ...getMetadata(subscription),
  };
};
