import React from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {MeditationListIcon} from 'assets/Images';
import Spacings from 'resources/Spacings';
import Fonts, {FontSizes} from 'resources/Fonts';
import ColorPalette from 'resources/ColorPalette';
import UiUtils from 'presentation/ui/utils/UiUtils';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import MeditationSectionsItem from 'presentation/ui/screens/meditations/MeditationSectionsItem';
import {Observer} from 'mobx-react';
import {useTranslation} from 'react-i18next';
import {state} from 'data/store';
import Section from 'entities/Section';
import {Navigator} from 'presentation/ui/Navigation';
import {SectionsManager} from 'domain/managers';
import StatusBar from 'presentation/ui/components/common/StatusBar';

const MeditationSections: React.FunctionComponent = () => {
  const {t} = useTranslation('sections');

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyles={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <Image style={styles.icon} source={MeditationListIcon} />
        <Text style={styles.header}>{t('Title')}</Text>
        <Text style={styles.content}>{t('Subtitle')}</Text>
        <Observer>
          {() => {
            const {sections, selectedSectionIndex, setSelectedSectionId} = state;

            const _sectionItemPressed = (section: Section) => {
              if (SectionsManager.isLocked(section)) {
                Navigator.navigateToSubscribe();
                return;
              }

              Navigator.navigateToMeditationSectionScreen(section);
            };

            const _renderSectionItem = (section: Section) => (
              <MeditationSectionsItem
                section={section}
                onPress={() => _sectionItemPressed(section)}
              />
            );

            const _setSelectedSection = (section: Section) => {
              setSelectedSectionId(section.id);
            };

            return (
              <>
                <View style={styles.pagination}>
                  <Pagination
                    dotsLength={sections.length}
                    activeDotIndex={selectedSectionIndex}
                    dotStyle={styles.activeDotStyle}
                    inactiveDotStyle={styles.inactiveDotStyle}
                    inactiveDotScale={1}
                  />
                </View>
                <View style={styles.carousel}>
                  <Carousel
                    data={sections}
                    renderItem={({item}) => _renderSectionItem(item)}
                    sliderWidth={UiUtils.getWindowWidth()}
                    itemWidth={UiUtils.getWindowWidth() - 90}
                    firstItem={selectedSectionIndex}
                    onSnapToItem={(index) => _setSelectedSection(sections[index])}
                  />
                </View>
              </>
            );
          }}
        </Observer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: ColorPalette.grayBlack_393737,
  },
  container: {
    paddingTop: 5,
    alignItems: 'center',
  },
  icon: {
    marginTop: 20,
    height: (UiUtils.getWindowHeight() / 100) * 5,
    aspectRatio: 1,
  },
  header: {
    height: '5.2%',
    color: ColorPalette.white,
    marginTop: Spacings.x3_12,
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
  },
  content: {
    height: '5%',
    color: ColorPalette.white,
    marginTop: Spacings.x3_12,
    fontSize: FontSizes._15,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
  },
  pagination: {
    height: '10%',
    marginTop: -30,
    width: UiUtils.getWindowWidth(),
    marginBottom: -15,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: ColorPalette.white,
    backgroundColor: 'transparent',
  },
  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: ColorPalette.white,
    opacity: 1,
    marginHorizontal: -10,
    backgroundColor: ColorPalette.white,
  },
  carousel: {
    position: 'relative',
    marginTop: -5,
  },
});

export default MeditationSections;
