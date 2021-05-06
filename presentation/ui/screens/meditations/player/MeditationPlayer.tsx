import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  MeditationListIcon,
  PlayerAddToFavoriteIcon,
  PlayerAddToFavoriteSelectedIcon,
  PlayerFileDownloadIcon,
  PlayerFileDownloadSelectedIcon,
  PlayerNextTrackIcon,
  PlayerPauseIcon,
  PlayerPlayFromStartIcon,
  PlayerPreviousTrackIcon,
  PlayIcon,
} from 'assets/Images';
import Meditation from 'entities/Meditation';
import UiUtils from 'presentation/ui/utils/UiUtils';
import Spacings from 'resources/Spacings';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import BackButton from 'presentation/ui/components/common/BackButton';
import CircularProgressBar from 'presentation/ui/components/common/CircularProgressBar';
import LinearGradient from 'react-native-linear-gradient';
import {Navigator} from 'presentation/ui/Navigation';
import Section from 'entities/Section';
import {extractMeditationTag} from 'presentation/services/MeditationsServiceUtils';
import {MeditationsService} from 'presentation/services';
import {MeditationsManager} from 'domain/managers';
import {Observer} from 'mobx-react';
import AudioPlayerCallbacks, {PlaybackStatus} from 'presentation/player/AudioPlayerCallbacks';
import {AudioPlayer} from 'presentation/player';
import Track from 'presentation/player/Track';
import StatusBar from 'presentation/ui/components/common/StatusBar';
import {AnalyticsTracker} from 'domain/analytics';

export interface MeditationPlayerProps {
  section: Section;
  meditation: Meditation;
}

const MeditationPlayer: React.FunctionComponent<MeditationPlayerProps> = ({
  section,
  meditation,
}) => {
  const [playbackInformation, setPlaybackInformation] = useState<PlaybackStatus>();

  const [offlineButtonLock, setOfflineButtonLock] = useState<boolean | undefined>();
  const [favoriteButtonLock, setFavoriteButtonLock] = useState<boolean | undefined>();

  useEffect(() => {
    const callbacks: AudioPlayerCallbacks = {
      onPlaybackStatusChanged,
    };
    AudioPlayer.addCallbacks(callbacks);
    setPlaybackInformation(undefined);
    return () => {
      AudioPlayer.removeCallbacks(callbacks);
    };
  }, [meditation]);

  const isConnectedToPlayer = (track?: Track) => {
    const track_ = track || AudioPlayer.getTrack();
    if (!track_) {
      return false;
    }

    const tag = extractMeditationTag(track_);
    return tag && tag.meditation.id === meditation.id;
  };

  const onPlaybackStatusChanged = (status: PlaybackStatus) => {
    if (!isConnectedToPlayer(status.track)) {
      setPlaybackInformation(undefined);
      return;
    }

    setPlaybackInformation(status);
  };

  const _onPlay = async () => {
    await AnalyticsTracker.trackMeditationAction({
      key: 'started',
      meditation,
      section,
    });

    if (!isConnectedToPlayer()) {
      await MeditationsService.play(section, meditation, false);
      return;
    }

    await AudioPlayer.play();
  };

  const _onPause = async () => {
    await AnalyticsTracker.trackMeditationAction({
      key: 'paused',
      meditation,
      section,
    });

    if (!isConnectedToPlayer()) return;

    await AudioPlayer.pause();
  };

  const _togglePlayPause = async () => {
    if (isPlaying()) {
      await _onPause();
    } else {
      await _onPlay();
    }
  };

  const _onPrevious = async () => {
    await MeditationsService.playPrevious(section, meditation, true);
  };

  const _onNext = async () => {
    await MeditationsService.playNext(section, meditation, true);
  };

  const _onReplay = async () => {
    await AnalyticsTracker.trackMeditationAction({
      key: 'restarted',
      meditation,
      section,
    });

    if (!isConnectedToPlayer()) {
      await MeditationsService.play(section, meditation, false);
      return;
    }

    await AudioPlayer.replay();
  };

  const _seekToPercent = async (percent: number) => {
    if (!isConnectedToPlayer()) return;

    await AudioPlayer.seekToPercent(percent);
  };

  const _onBackButtonPress = async () => {
    Navigator.goBack();
  };

  const isPlaying = () => {
    return playbackInformation && playbackInformation.shouldPlay;
  };

  const setFavorite = async (isFavorite: boolean) => {
    if (favoriteButtonLock !== undefined) return;

    await AnalyticsTracker.trackButtonClicked({
      key: 'toggleAction',
      type: 'Mediation',
      action: 'Favourite',
      flag: isFavorite,
      meditation,
      section,
    });

    setFavoriteButtonLock(isFavorite);
    await MeditationsManager.setIsFavorite(section, meditation, isFavorite);
    setFavoriteButtonLock(undefined);
  };

  const setAvailableOffline = async (isAvailableOffline: boolean) => {
    if (offlineButtonLock !== undefined) return;

    await AnalyticsTracker.trackButtonClicked({
      key: 'toggleAction',
      type: 'Mediation',
      action: 'Download',
      flag: isAvailableOffline,
      meditation,
      section,
    });

    setOfflineButtonLock(isAvailableOffline);
    await MeditationsManager.setIsAvailableOffline(
      section,
      meditation,
      isAvailableOffline,
    );
    setOfflineButtonLock(undefined);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return `0${string}`;
      }
      return string;
    };
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  };

  const playbackTime = playbackInformation ? playbackInformation.time : undefined;
  const playbackPosition = playbackTime ? playbackTime.position : undefined;
  // noinspection UnnecessaryLocalVariableJS
  const playbackDuration = playbackTime ? playbackTime.duration : undefined;
  let playbackRemains = playbackDuration;
  if (playbackPosition && playbackRemains) {
    playbackRemains -= playbackPosition;
  }
  let fill = 0;
  if (playbackPosition && playbackDuration) {
    fill = (playbackPosition / playbackDuration) * 100;
  }
  const position = playbackPosition ? formatTime(playbackPosition) : '--:--';
  const remains = playbackRemains ? formatTime(playbackRemains) : '--:--';

  return (
    <View>
      <StatusBar barStyles={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}/>
      <ImageBackground
        style={styles.background}
        blurRadius={Platform.OS == 'android' ? 3 : 10}
        source={{uri: meditation.image.uri}}
      >
        <LinearGradient
          style={styles.backgroundGradient}
          colors={['#2828287f', '#28282800', '#28282800']}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Image style={styles.icon} source={MeditationListIcon}/>
              <Text style={styles.header}>{meditation.title.toUpperCase()}</Text>
              <Text style={styles.content}>{meditation.subtitle}</Text>
            </View>
            <BackButton onPress={_onBackButtonPress}/>
            <View style={styles.playerProgressContainer}>
              <TouchableOpacity
                style={styles.playerControlsPrevious}
                onPress={_onPrevious}
              >
                <Image
                  source={PlayerPreviousTrackIcon}
                  style={styles.playerControlsImg}
                />
              </TouchableOpacity>
              <CircularProgressBar
                icon={isPlaying() ? PlayerPauseIcon : PlayIcon}
                onIconTouch={_togglePlayPause}
                fill={fill}
                onFillChanged={_seekToPercent}
                isLoaded={playbackInformation ? playbackInformation.isLoaded : false}
              />
              <TouchableOpacity style={styles.playerControlsNext} onPress={_onNext}>
                <Image source={PlayerNextTrackIcon} style={styles.playerControlsImg}/>
              </TouchableOpacity>
            </View>
            <View style={styles.timeProgressContainer}>
              <Text style={styles.timeProgress}>{position}</Text>
              <Text style={styles.timeProgress}>{remains}</Text>
            </View>
            <View style={styles.additionalPlayerControlsContainer}>
              <TouchableOpacity
                onPress={_onReplay}
                style={styles.additionalPlayerControlsItem}
              >
                <Image
                  source={PlayerPlayFromStartIcon}
                  style={styles.additionalPlayerControlsIcon}
                />
              </TouchableOpacity>

              <Observer>
                {() => {
                  const isFavorite = MeditationsManager.isFavorite(meditation);
                  const isSelected =
                    favoriteButtonLock !== undefined ? favoriteButtonLock : isFavorite;
                  return (
                    <TouchableOpacity
                      style={styles.additionalPlayerControlsItem}
                      onPress={() => setFavorite(!isFavorite)}
                    >
                      {isSelected ? (
                        <Image
                          source={PlayerAddToFavoriteSelectedIcon}
                          style={styles.additionalPlayerControlsIcon}
                        />
                      ) : (
                        <Image
                          source={PlayerAddToFavoriteIcon}
                          style={styles.additionalPlayerControlsIcon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              </Observer>

              <Observer>
                {() => {
                  const isAvailableOffline = MeditationsManager.isAvailableOffline(
                    meditation,
                  );
                  const isSelected =
                    offlineButtonLock != undefined
                      ? offlineButtonLock
                      : isAvailableOffline;
                  return (
                    <TouchableOpacity
                      style={styles.additionalPlayerControlsItem}
                      onPress={() => setAvailableOffline(!isAvailableOffline)}
                    >
                      {isSelected ? (
                        <Image
                          source={PlayerFileDownloadSelectedIcon}
                          style={styles.additionalPlayerControlsIcon}
                        />
                      ) : (
                        <Image
                          source={PlayerFileDownloadIcon}
                          style={styles.additionalPlayerControlsIcon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              </Observer>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  backgroundGradient: {
    backgroundColor: ColorPalette.blackShadow_20_00000020,
    flex: 1,
  },
  container: {
    paddingTop: UiUtils.getStatusBarHeight(),
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
    marginLeft: '5%',
  },
  icon: {
    height: (UiUtils.getWindowHeight() / 100) * 5,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  header: {
    color: ColorPalette.white,
    marginTop: Spacings.x3_12,
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
  },
  content: {
    color: ColorPalette.white,
    marginTop: Spacings.x3_12,
    fontSize: FontSizes._12,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  playerProgressContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  playerControlsNext: {
    marginRight: '5%',
  },
  playerControlsPrevious: {
    marginLeft: '5%',
    zIndex: 1,
  },
  playerControlsImg: {
    flex: 1,
    resizeMode: 'contain',
    height: 23,
    width: 23,
    marginTop: 70,
  },
  timeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  timeProgress: {
    fontFamily: Fonts.CenturyGothicBold,
    color: ColorPalette.white,
    fontSize: 18,
  },
  additionalPlayerControlsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  additionalPlayerControlsItem: {
    alignSelf: 'center',
  },
  additionalPlayerControlsIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
});

export default MeditationPlayer;
