import MeditationSections from 'presentation/ui/screens/meditations/MeditationSections';
import MeditationSection from './meditations/section/MeditationSection';
import MeditationSectionRouter from './meditations/section/MeditationSectionRouter';
import MeditationPlayer from './meditations/player/MeditationPlayer';
import MeditationPlayerRouter from './meditations/player/MeditationPlayerRouter';
import FavouriteMeditations from 'presentation/ui/screens/favorite/FavouriteMeditations';
import TheBeMindset from 'presentation/ui/screens/social/TheBeMindset';
import OfflineMeditations from './favorite/OfflineMeditations';
import FavouriteMeditationsRouter from './favorite/FavouriteMeditationsRouter';
import OfflineMeditationsRouter from './favorite/OfflineMeditationsRouter';
import Settings from './settings/Settings';
import SettingsRouter from './settings/SettingsRouter';
import InformationDocument from 'presentation/ui/screens/settings/InformationDocument';
import InformationDocumentRouter from 'presentation/ui/screens/settings/InformationDocumentRouter';
import SubscriptionModal from 'presentation/ui/screens/meditations/subscriptionModal/SubscriptionModal';
import MeditationSectionsRouter from 'presentation/ui/screens/meditations/MeditationSectionsRouter';
import TheBeMindsetRouter from './social/TheBeMindsetRouter';
import SubscribeRouter from './settings/SubscribeRouter';
import SubscriptionModalRouter from './meditations/subscriptionModal/SubscriptionModalRouter';

const meditationPlayerRouter = new MeditationPlayerRouter();
const favouriteMeditationsRouter = new FavouriteMeditationsRouter();
const settingsRouter = new SettingsRouter();
const theBeMindsetRouter = new TheBeMindsetRouter();
const offlineMeditationsRouter = new OfflineMeditationsRouter();
const informationDocumentRouter = new InformationDocumentRouter();
const meditationSectionsRouter = new MeditationSectionsRouter();
const meditationSectionRouter = new MeditationSectionRouter();
const subscribeRouter = new SubscribeRouter();
const subscriptionModalRouter = new SubscriptionModalRouter();

export {
  MeditationSections,
  meditationSectionsRouter as MeditationSectionsRouter,
  MeditationSection,
  meditationSectionRouter as MeditationSectionRouter,
  MeditationPlayer,
  meditationPlayerRouter as MeditationPlayerRouter,
  FavouriteMeditations,
  favouriteMeditationsRouter as FavouriteMeditationsRouter,
  TheBeMindset,
  theBeMindsetRouter as TheBeMindsetRouter,
  OfflineMeditations,
  offlineMeditationsRouter as OfflineMeditationsRouter,
  Settings,
  settingsRouter as SettingsRouter,
  SubscriptionModal,
  InformationDocument,
  informationDocumentRouter as InformationDocumentRouter,
  subscribeRouter as SubscribeRouter,
  subscriptionModalRouter as SubscriptionModalRouter,
};
