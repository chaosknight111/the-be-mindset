import React from 'react';
import {Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MeditationListIcon} from 'assets/Images';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import {useTranslation} from 'react-i18next';
import {ExternalService} from 'presentation/ui/services';
import {Observer} from 'mobx-react';
import {state} from 'data/store';
import {AnalyticsTracker} from 'domain/analytics';
import ExternalLink from 'entities/ExternalLink';
import UiUtils from '../../utils/UiUtils';

const TheBeMindset: React.FC = () => {
  const {t} = useTranslation('common');

  const _onSocialPress = async (externalLink: ExternalLink) => {
    await AnalyticsTracker.trackButtonClicked({
      key: 'socialMedia',
      externalLink,
    });
    await ExternalService.openLink(externalLink.linkUrl, externalLink.useInAppBrowser);
  };

  const SocialItem = ({link, height}: {link: ExternalLink; height: number}) => (
    <TouchableOpacity
      style={styles.socialItem}
      activeOpacity={0.8}
      onPress={() => _onSocialPress(link)}
    >
      <ImageBackground
        source={{uri: link.background.uri}}
        style={styles.socialBackground}
      >
        <View style={styles.socialBackgroundView}>
          <Image source={{uri: link.icon.uri}} style={{...styles.socialIcon, height}}/>
          <Text style={styles.socialTitle}>{link.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={MeditationListIcon}/>
      <Text style={styles.title}>{t('Title')}</Text>
      <Observer>
        {() => {
          const {externalLinks} = state;

          return (
            <ScrollView style={styles.socialContainer} indicatorStyle="white">
              <View>
                {externalLinks.map((item, index) => (
                  <SocialItem key={index} link={item} height={30}/>
                ))}
              </View>
            </ScrollView>
          );
        }}
      </Observer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.grayBlack_393737,
  },
  title: {
    color: ColorPalette.white,
    marginTop: 10,
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
  },
  socialContainer: {
    flex: 1,
    borderRadius: 8,
    marginTop: 10,
  },
  icon: {
    marginTop: 25,
    alignSelf: 'center',
    height: (UiUtils.getWindowHeight() / 100) * 5,
    aspectRatio: 1,
  },
  socialItem: {
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e030',
  },
  socialBackground: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  socialBackgroundView: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  socialIcon: {
    flex: 0.2,
    resizeMode: 'contain',
  },
  socialTitle: {
    fontSize: FontSizes._25,
    fontFamily: Fonts.CenturyGothic,
    color: 'white',
    marginLeft: 10,
  },
});

export default TheBeMindset;
