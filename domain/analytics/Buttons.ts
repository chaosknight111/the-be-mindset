import {SubscriptionType} from 'entities/Subscription';
import {getMeditationMetadata, MeditationMetadata} from 'domain/analytics/Metadata';
import ExternalLink from 'entities/ExternalLink';

type ButtonProperties = {
  Button: string;
};

const ButtonKeys = {
  toggleAction: 'Toggle action',
  informationDocument: 'Information document',
  rateApp: 'Rate app',
  subscription: 'Subscription',
  buySubscription: 'Buy subscription',
  socialMedia: 'Social media',
};

type BuySubscription = {
  key: 'buySubscription';
  type: SubscriptionType;
  source: 'Subscription page' | 'Marketing popup';
};

type ToggleAction = {
  key: 'toggleAction';
  type: 'Mediation';
  action: 'Favourite' | 'Download';
  flag: boolean;
} & MeditationMetadata;

type SocialMedia = {
  key: 'socialMedia';
  externalLink: ExternalLink;
};

type RateApp = {
  key: 'rateApp';
};

type Subscription = {
  key: 'subscription';
};

type InformationDocument = {
  key: 'informationDocument';
  documentKey: string;
  documentTitle: string;
};

export type Button =
  | ToggleAction
  | InformationDocument
  | RateApp
  | Subscription
  | BuySubscription
  | SocialMedia;

const getSubscriptionTypeMetadata = (type: SubscriptionType) => {
  switch (type) {
    case SubscriptionType.monthly:
      return 'Monthly';
    case SubscriptionType.yearlyWithTrial:
    case SubscriptionType.yearlyOld:
      return 'Yearly';
    case SubscriptionType.lifelong:
      return 'Lifetime';
  }
};

const getMetadata = (button: Button) => {
  switch (button.key) {
    case 'toggleAction':
      return {
        Type: button.type,
        Action: button.action,
        Flag: button.flag ? 'Checked' : 'Unchecked',
        ...getMeditationMetadata(button),
      };
    case 'informationDocument':
      return {
        'Document Key': button.documentKey,
        'Document Title': button.documentTitle,
      };
    case 'buySubscription':
      return {
        'Subscription Type': getSubscriptionTypeMetadata(button.type),
        'Subscription Source': button.source,
      };
    case 'socialMedia':
      return {
        'Id': button.externalLink.id,
        'Button Title': button.externalLink.title,
        'Url': button.externalLink.linkUrl,
      };
    default:
      return undefined;
  }
};

export const getButtonProperties = (button: Button): ButtonProperties => {
  return {
    Button: ButtonKeys[button.key],
    ...getMetadata(button),
  };
};
