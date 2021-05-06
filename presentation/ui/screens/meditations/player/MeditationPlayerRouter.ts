import {MeditationsService} from 'presentation/services';
import {MeditationPlayerProps} from 'presentation/ui/screens/meditations/player/MeditationPlayer';
import {AnalyticsTracker} from 'domain/analytics';

export default class MeditationPlayerRouter {
  onEnter = async ({section, meditation}: MeditationPlayerProps) => {
    await AnalyticsTracker.trackPageOpened({
      key: 'meditation',
      meditation,
      section,
    });

    await MeditationsService.play(section, meditation, false);
  };

  onExit = async () => {
    await MeditationsService.stop();
  };
}
