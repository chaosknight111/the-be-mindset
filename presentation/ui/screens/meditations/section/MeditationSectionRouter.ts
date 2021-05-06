import {MeditationSectionProps} from './MeditationSection';
import {AnalyticsTracker} from 'domain/analytics';

export default class MeditationSectionRouter {
  onEnter = async ({section}: MeditationSectionProps) => {
    await AnalyticsTracker.trackPageOpened({
      key: 'section',
      section,
    });
  };
}
