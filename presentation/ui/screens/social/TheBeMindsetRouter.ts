import {AnalyticsTracker} from 'domain/analytics';

export default class TheBeMindsetRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({key: 'theBeMindset'});
  };
}
