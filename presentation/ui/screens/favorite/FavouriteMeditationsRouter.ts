import {FavouriteMeditationsDataSource} from 'presentation/ui/screens/favorite/FavouriteMeditations';
import {AnalyticsTracker} from 'domain/analytics';

export default class FavouriteMeditationsRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({key: 'favourites'});

    FavouriteMeditationsDataSource.load();
  };
}
