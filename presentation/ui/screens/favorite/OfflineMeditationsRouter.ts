import {OfflineMeditationsDataSource} from 'presentation/ui/screens/favorite/OfflineMeditations';
import {AnalyticsTracker} from '../../../../domain/analytics';

export default class OfflineMeditationsRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({
      key: 'offlineMeditations',
    });

    OfflineMeditationsDataSource.load();
  };
}
