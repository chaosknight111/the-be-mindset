import DateUtils from 'domain/utils/DateUtils';
import {state} from 'data/store';
import {Navigator} from 'presentation/ui/Navigation';
import {AnalyticsTracker} from 'domain/analytics';

export default class MeditationScreenRouter {
  onEnter = async () => {
    await AnalyticsTracker.trackPageOpened({key: 'guidedMeditations'});

    await Navigator.waitForInteractionsAsync();

    const timeToDiffMs = 72 * 60 * 60 * 1000;
    const current = DateUtils.getCurrentMS();

    // This states sets to "undefined " value [in the App initializer (logigs soon will be changed)
    const isTimeToShowSubscriptionModal =
      state.lastTimeShownSubscriptionModal === undefined ||
      DateUtils.diffDateMS(current, state.lastTimeShownSubscriptionModal) >= timeToDiffMs;

    const isUserSubscribed = state.selectedSubscription !== undefined;
    if (!isUserSubscribed && isTimeToShowSubscriptionModal) {
      Navigator.navigateToSubscriptionModal();
    }
  };
}
