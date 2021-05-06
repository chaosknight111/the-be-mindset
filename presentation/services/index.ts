import MeditationsService from 'presentation/services/MeditationsService';
import IMeditationService from 'presentation/services/IMeditationService';
import SubscriptionService from 'presentation/services/SubscriptionService';
import ISubscriptionService from 'presentation/services/ISubscriptionService';
import IStartupAudioService from 'presentation/services/IStartupAudioService';
import StartupAudioService from 'presentation/services/StartupAudioService';
import IAlertService from './IAlertService';
import AlertService from './AlertService';
import {createIapInstance} from 'data/iap';
import {AnalyticsTracker} from 'domain/analytics';

const meditationServiceInstance = new MeditationsService();
const meditationService: IMeditationService = meditationServiceInstance;

const subscriptionServiceInstance = new SubscriptionService(
  createIapInstance(),
  AnalyticsTracker,
);
const subscriptionService: ISubscriptionService = subscriptionServiceInstance;

const startupAudioService: IStartupAudioService = new StartupAudioService();

const alertService: IAlertService = new AlertService();

export {
  meditationService as MeditationsService,
  subscriptionService as SubscriptionService,
  startupAudioService as StartupAudioService,
  alertService as AlertService,
};

export const initializeServicesAsync = async () => {
  await meditationServiceInstance.initialize();
  await subscriptionServiceInstance.initialize();
};
