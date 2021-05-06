import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import MeditationsGrid from './components/MeditationsGrid';
import {MeditationsManager} from 'domain/managers';
import {MeditationListIcon, OfflineMeditationsActionIcon} from 'assets/Images';
import Meditation from 'entities/Meditation';
import {Navigator} from 'presentation/ui/Navigation';
import {Observer} from 'mobx-react';
import MeditationsDataSource from 'presentation/ui/screens/favorite/MeditationsDataSource';
import BackButton from 'presentation/ui/components/common/BackButton';
import UiUtils from 'presentation/ui/utils/UiUtils';
import {useTranslation} from 'react-i18next';

const dataSource = new MeditationsDataSource(() =>
  MeditationsManager.getOfflineMeditations(),
);

const OfflineMeditations: React.FC = () => {
  const {t} = useTranslation('sections');

  const _onMeditationClick = (meditation: Meditation) => {
    const section = MeditationsManager.getSection(meditation);
    if (!section) return;

    Navigator.navigateToMeditationPlayerScreen(section, meditation);
  };

  const _onMeditationActionClick = async (
    meditation: Meditation,
    isAvailableOffline: boolean,
  ) => {
    const section = MeditationsManager.getSection(meditation);
    if (!section) return;

    await MeditationsManager.setIsAvailableOffline(
      section,
      meditation,
      isAvailableOffline,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rectangle}/>
      <BackButton/>
      <Image style={styles.icon} source={MeditationListIcon}/>
      <Text style={styles.title}>{t('Available_Offline')}</Text>
      <View style={styles.meditationsContainer}>
        <Observer>
          {() => {
            return dataSource.meditations.length ? (
              <MeditationsGrid
                meditations={[...dataSource.meditations]}
                onMeditationClick={_onMeditationClick}
                isMeditationActionActive={(meditation) =>
                  MeditationsManager.isAvailableOffline(meditation)
                }
                onMeditationActionPress={_onMeditationActionClick}
                actionIconTintColor={OfflineMeditationsActionIcon}
              />
            ) : (
              <Text style={styles.empty}>{t('Offline_Empty_Message')}</Text>
            );
          }}
        </Observer>
      </View>
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
  offlineMeditationsButton: {
    height: '13%',
    width: '90%',
    backgroundColor: ColorPalette.yellow_ffd000,
    marginBottom: 10,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  offlineMeditationsButtonText: {
    textAlign: 'center',
    fontSize: FontSizes._17,
    fontFamily: Fonts.CenturyGothicBold,
    color: ColorPalette.white,
    marginTop: 30,
  },
  offlineMeditationsButtonIcon: {
    height: 30,
    width: 30,
    marginLeft: '10%',
  },
  rectangle: {
    height: '60%',
    width: UiUtils.getWindowWidth(),
    backgroundColor: ColorPalette.white,
    borderRadius: 50,
    position: 'absolute',
    opacity: 0.1,
    bottom: '10%',
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

export default OfflineMeditations;

export {dataSource as OfflineMeditationsDataSource};
