import Section from 'entities/Section';
import Meditation from 'entities/Meditation';
import {SubscriptionType} from 'entities/Subscription';

export type SectionMetadata = {
  section: Section;
};

export type MeditationMetadata = {
  meditation: Meditation;
} & SectionMetadata;

export const getSectionMetadata = ({section}: SectionMetadata) => ({
  'Section Id': section.id,
  'Section Title': section.title,
});

export const getMeditationMetadata = ({meditation, section}: MeditationMetadata) => ({
  'Meditation Id': meditation.id,
  'Meditation Title': meditation.title,
  ...getSectionMetadata({section}),
});

export const getSubscriptionTypeMetadata = (
  subscription: SubscriptionType | undefined,
) => {
  switch (subscription) {
    case SubscriptionType.monthly:
      return 'Monthly';
    case SubscriptionType.yearlyOld:
      return 'Yearly (old)';
    case SubscriptionType.yearlyWithTrial:
      return 'Yearly (with trial)';
    case SubscriptionType.lifelong:
      return 'Lifetime';
    default:
      return 'None';
  }
};
