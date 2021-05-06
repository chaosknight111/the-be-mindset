import {Actions} from 'react-native-router-flux';
import Section from '../../entities/Section';
import Meditation from '../../entities/Meditation';
import {InteractionManager} from 'react-native';

export const NavigatorKeys = {
  MeditationSections: 'meditationSections',
  MeditationSection: 'meditationSection',
  MeditationPlayer: 'meditationPlayer',
  TheBeMindset: 'theBeMindset',
  FavoriteMeditations: 'favoriteMeditations',
  OfflineMeditations: 'offlineMeditations',
  InformationDocument: 'informationDocument',
  Settings: 'settings',
  Subscribe: 'subscribe',
  SubscriptionModal: 'subscriptionModal',
  Main: 'main',
};

// noinspection JSUnusedGlobalSymbols
export const Navigator = {
  goBack: () => Actions.pop(),
  waitForInteractionsAsync: () => {
    return new Promise((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        resolve();
      });
    });
  },
  isCurrent: (sceneKey: keyof typeof NavigatorKeys) =>
    Actions.currentScene === NavigatorKeys[sceneKey],
  navigateToMain: () => Actions[NavigatorKeys.Main](),
  navigateToMeditationSectionsScreen: () => Actions[NavigatorKeys.MeditationSections](),
  navigateToMeditationSectionScreen: (section: Section) =>
    Actions[NavigatorKeys.MeditationSection]({section}),
  navigateToMeditationPlayerScreen: (section: Section, meditation: Meditation) =>
    Actions[NavigatorKeys.MeditationPlayer]({section, meditation}),
  refreshMeditationPlayerScreen: (section: Section, meditation: Meditation) => {
    if (Actions.currentScene !== NavigatorKeys.MeditationPlayer) return false;

    Actions.refresh({section, meditation});
    return true;
  },
  navigateToOfflineMeditations: () => Actions[NavigatorKeys.OfflineMeditations](),
  navigateToInformationDocument: (title: string, documentKey: string) => {
    return Actions[NavigatorKeys.InformationDocument]({title, documentKey});
  },
  navigateToSubscribe: () => Actions[NavigatorKeys.Subscribe](),
  navigateToSubscriptionModal: () => Actions[NavigatorKeys.SubscriptionModal](),
};
