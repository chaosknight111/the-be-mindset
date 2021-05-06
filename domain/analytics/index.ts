import {createMixpanelInstance, initializeMixpanel, MixpanelConfig} from 'data/mixpanel';
import AnalyticsTracker from './AnalyticsTracker';
import IAnalyticsTracker from './IAnalyticsTracker';

const mixpanelInstance = createMixpanelInstance(MixpanelConfig);
const analyticsTracker: IAnalyticsTracker = new AnalyticsTracker(mixpanelInstance);

export const initializeAnalyticsAsync = async () => {
  await initializeMixpanel(mixpanelInstance);
};

export {analyticsTracker as AnalyticsTracker};
