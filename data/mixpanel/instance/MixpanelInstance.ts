import MixpanelConfiguration from './MixpanelConfiguration';
import {MixpanelInstance} from 'react-native-mixpanel';

export const createMixpanelInstance = (configuration: MixpanelConfiguration) => {
  return new MixpanelInstance(configuration.token);
};

export const initializeMixpanel = async (instance: MixpanelInstance) => {
  await instance.initialize();
};
