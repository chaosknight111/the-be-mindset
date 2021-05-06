import {createMixpanelInstance, initializeMixpanel} from './instance/MixpanelInstance';
import {MixpanelConfiguration} from './MixpanelConfiguration';

const config = __DEV__ ? MixpanelConfiguration.test : MixpanelConfiguration.production;

export {
  //
  createMixpanelInstance,
  initializeMixpanel,
  config as MixpanelConfig,
};
