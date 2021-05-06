import React from 'react';
import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  FavouriteMeditationsActionIcon, MeditationListIcon,
  OfflineMeditationsActionIcon,
} from 'assets/Images';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import MeditationsGrid from 'presentation/ui/screens/favorite/components/MeditationsGrid';
import {useTranslation} from 'react-i18next';
import {Observer} from 'mobx-react';
import {MeditationsManager} from 'domain/managers';
import MeditationsDataSource from 'presentation/ui/screens/favorite/MeditationsDataSource';
import Meditation from 'entities/Meditation';
import {Navigator} from 'presentation/ui/Navigation';
import UiUtils from 'presentation/ui/utils/UiUtils';
import LinearGradient from 'react-native-linear-gradient';

const dataSource = new MeditationsDataSource(() =>
  MeditationsManager.getFavouriteMeditations(),
);

const FavouriteMeditations: React.FC = () => {
  const {t} = useTranslation('sections');

  const _onMeditationClick = (meditation: Meditation) => {
    const section = MeditationsManager.getSection(meditation);
    if (!section) return;

    Navigator.navigateToMeditationPlayerScreen(section, meditation);
  };

  const _onMeditationActionClick = async (
    meditation: Meditation,
    isFavourite: boolean,
  ) => {
    const section = MeditationsManager.getSection(meditation);
    if (!section) return;

    await MeditationsManager.setIsFavorite(section, meditation, isFavourite);
  };

  const _offlineMeditationsClick = () => {
    Navigator.navigateToOfflineMeditations();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rectangle}/>
      <Image style={styles.icon} source={MeditationListIcon}/>
      <Text style={styles.title}>{t('Favorite_Meditations')}</Text>
      <View style={styles.meditationsContainer}>
        <Observer>
          {() => {
            return dataSource.meditations.length ? (
              <MeditationsGrid
                meditations={[...dataSource.meditations]}
                onMeditationClick={_onMeditationClick}
                isMeditationActionActive={(meditation) =>
                  MeditationsManager.isFavorite(meditation)
                }
                onMeditationActionPress={_onMeditationActionClick}
                actionIconTintColor={FavouriteMeditationsActionIcon}
              />
            ) : (
              <Text style={styles.empty}>{t('Favorite_Empty_Message')}</Text>
            );
          }}
        </Observer>
      </View>
      <TouchableOpacity
        style={styles.offlineMeditationsButton}
        onPress={() => _offlineMeditationsClick()}
        activeOpacity={0.7}
      >
        <LinearGradient
          style={styles.gradientButton}
          colors={['#ffd000', '#ffd000']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
        >
          <View style={styles.btnContainer}>
            <Text style={styles.offlineMeditationsButtonText}>
              {t('Available_Offline')}
            </Text>
            <Image
              source={OfflineMeditationsActionIcon}
              style={styles.offlineMeditationsButtonIcon}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.grayBlack_393737,
  },
  meditationsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  icon: {
    marginTop: 25,
    alignSelf: 'center',
    height: (UiUtils.getWindowHeight() / 100) * 5,
    aspectRatio: 1,
  },
  title: {
    color: ColorPalette.white,
    marginTop: 10,
    marginBottom: 10,
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
  },
  rectangle: {
    height: '45%',
    width: UiUtils.getWindowWidth(),
    backgroundColor: ColorPalette.white,
    borderRadius: 50,
    position: 'absolute',
    opacity: 0.1,
    bottom: '30%',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  offlineMeditationsButton: {
    height: '13%',
    marginBottom: 30,
    marginTop: 0,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  gradientButton: {
    height: '100%',
    width: '100%',
    marginBottom: 10,
    marginTop: 0,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  offlineMeditationsButtonText: {
    textAlign: 'center',
    fontSize: FontSizes._17,
    fontFamily: Fonts.CenturyGothicBold,
    color: ColorPalette.white,
    textAlignVertical: 'center',
  },
  offlineMeditationsButtonIcon: {
    left: '45%',
    height: 25,
    width: 20,
  },
  empty: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.CenturyGothicBold,
    fontSize: FontSizes._25,
    color: ColorPalette.white,
    marginTop: "30%",
  },
});

export default FavouriteMeditations;

export {dataSource as FavouriteMeditationsDataSource};
