import Track from 'presentation/player/Track';
import {AudioPlayer} from 'presentation/player';
import Meditation from 'entities/Meditation';
import Section from 'entities/Section';
import IMeditationService from 'presentation/services/IMeditationService';
import MeditationTrackTag from 'presentation/services/MeditationTrackTag';
import {Navigator} from 'presentation/ui/Navigation';
import {MeditationsManager} from 'domain/managers';
import {action} from 'mobx';
import {state} from 'data/store';
import {AlertService} from 'presentation/services/';
import {ExternalService} from 'presentation/ui/services';
import i18next from 'i18next';
import {Platform} from 'react-native';
import TrackInfo from 'presentation/player/TrackInfo';
import {AnalyticsTracker} from 'domain/analytics';

export default class MeditationsService implements IMeditationService {
  private initialized: boolean = false;

  private static readonly timeToCheck = 10;

  constructor() {
    const callbacks = {
      onTrackFinished: this.onTrackFinished.bind(this),
    };
    AudioPlayer.addCallbacks(callbacks);
  }

  async initialize() {
    if (this.initialized) return;
    this.initialized = true;
  }

  async play(section: Section, meditation: Meditation, redirect: boolean) {
    await AnalyticsTracker.trackMeditationAction({
      key: 'started',
      meditation,
      section,
    });

    const track = MeditationsService.createTrack(section, meditation);

    if (redirect) MeditationsService.redirect(section, meditation);

    if (!(await AudioPlayer.setTrack(track))) return;
    await AudioPlayer.play();
  }

  @action
  private quantityInc() {
    return state.quantityOpenedMeditations++;
  }

  showRateApp() {
    const quantity = state.quantityOpenedMeditations;
    this.quantityInc();

    if (
      quantity % MeditationsService.timeToCheck ===
      MeditationsService.timeToCheck - 1
    ) {
      AlertService.showMessage(
        i18next.t('sections:RateAlert.Title'),
        Platform.OS === 'ios'
          ? i18next.t('sections:RateAlert.Message.IOS')
          : i18next.t('sections:RateAlert.Message.Android'),
        i18next.t('sections:RateAlert.Positive'),
        () => ExternalService.requestAppReview(),
        i18next.t('sections:RateAlert.Negative'),
        () => null,
      );
    }
  }

  private static createTrack(section: Section, meditation: Meditation) {
    const {uri} = meditation.track;
    let fileUri: string | undefined;
    const offlineMeditation = MeditationsManager.offlineTrack(meditation);
    if (offlineMeditation) {
      fileUri = offlineMeditation.fileUri;
    }
    const info = new TrackInfo(
      meditation.title,
      meditation.subtitle,
      undefined, // todo: implement
    );
    const tag = new MeditationTrackTag(section, meditation);
    return new Track(uri, fileUri, info, tag);
  }

  private static redirect(section: Section, meditation: Meditation) {
    if (Navigator.isCurrent('MeditationPlayer')) {
      Navigator.refreshMeditationPlayerScreen(section, meditation);
    }
  }

  async stop() {
    await AudioPlayer.stop();
  }

  async playPrevious(section: Section, meditation: Meditation, redirect: boolean) {
    const {meditations} = section;
    const index = meditations.findIndex((m) => m.id === meditation.id);
    if (index > 0) {
      await this.play(section, meditations[index - 1], redirect);
    }
  }

  async playNext(section: Section, meditation: Meditation, redirect: boolean) {
    const {meditations} = section;
    const index = meditations.findIndex((m) => m.id === meditation.id);
    if (index > -1 && index < meditations.length - 1) {
      await this.play(section, meditations[index + 1], redirect);
    }
  }

  private async onTrackFinished(track: Track) {
    const {meditation, section}: MeditationTrackTag = track.tag;

    await AnalyticsTracker.trackMeditationAction({
      key: 'finished',
      meditation,
      section,
    });

    this.showRateApp();
  }
}
