import {
  getMeditationMetadata,
  getSectionMetadata,
  MeditationMetadata,
  SectionMetadata,
} from './Metadata';

type PageProperties = {
  Page: string;
};

const PageKeys = {
  guidedMeditations: 'Guided meditations',
  theBeMindset: 'The BE mindset',
  favourites: 'Favourites',
  settings: 'Settings',
  meditation: 'Meditation',
  section: 'Section',
  subscribe: 'Subscriptions',
  subscriptionModal: 'Subscription modal',
  offlineMeditations: 'Offline meditations',
};

type GuidedMeditations = {
  key: 'guidedMeditations';
};

type TheBeMindset = {
  key: 'theBeMindset';
};

type Favourites = {
  key: 'favourites';
};

type Settings = {
  key: 'settings';
};

type Meditation = {
  key: 'meditation';
} & MeditationMetadata;

type Section = {
  key: 'section';
} & SectionMetadata;

type Subscribe = {
  key: 'subscribe';
};

type SubscriptionModal = {
  key: 'subscriptionModal';
};

type OfflineMeditations = {
  key: 'offlineMeditations';
};

export type Page =
  | GuidedMeditations
  | Meditation
  | TheBeMindset
  | Favourites
  | Settings
  | Subscribe
  | Section
  | SubscriptionModal
  | OfflineMeditations;

const getMetadata = (page: Page) => {
  switch (page.key) {
    case 'section':
      return getSectionMetadata(page);
    case 'meditation':
      return getMeditationMetadata(page);
    default:
      return undefined;
  }
};

export const getPageProperties = (page: Page): PageProperties => {
  return {
    Page: PageKeys[page.key],
    ...getMetadata(page),
  };
};
