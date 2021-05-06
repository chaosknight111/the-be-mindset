import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import {
  MeditationListIcon,
  SettingsPrivacyPolicyIcon,
  SettingsRateAppIcon,
  SettingsSubscriptionIcon,
  SettingsSupportIcon,
  SettingsTermsConditionsIcon,
} from 'assets/Images';
import {useTranslation} from 'react-i18next';
import UiUtils from 'presentation/ui/utils/UiUtils';
import {ExternalService} from 'presentation/ui/services';
import {Navigator} from 'presentation/ui/Navigation';
import InformationDocuments from 'resources/InformationDocuments';
import {AnalyticsTracker} from '../../../../domain/analytics';
import DeviceInfo from 'react-native-device-info';

const Settings: React.FC = () => {
  const {t} = useTranslation('settings');

  const _rateApp = async () => {
    await AnalyticsTracker.trackButtonClicked({
      key: 'rateApp',
    });
    if (!(await ExternalService.requestAppReview())) {
      Alert.alert(t('OopsE'), t('Error.AppReviewFailed.Message'));
    }
  };

  const _subscription = async () => {
    await AnalyticsTracker.trackButtonClicked({
      key: 'subscription',
    });
    Navigator.navigateToSubscribe();
  };

  const _renderSettingsItem = (
    icon: ImageSourcePropType,
    text: string,
    onPress?: () => void,
  ) => (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.circleItem}>
          <Image source={icon} style={styles.settingsIcon} />
          <Text style={styles.iconText}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  type DocumentParams = {title: string; key: string};

  const _renderSettingsDocumentItem = (
    icon: ImageSourcePropType,
    text: string,
    documentInfo: DocumentParams,
  ) => {
    return _renderSettingsItem(icon, text, async () => {
      await AnalyticsTracker.trackButtonClicked({
        key: 'informationDocument',
        documentKey: documentInfo.key,
        documentTitle: documentInfo.title,
      });

      Navigator.navigateToInformationDocument(documentInfo.title, documentInfo.key);
    });
  };

  const {keys} = InformationDocuments;

  const [version, setVersion] = useState<string>();

  const loadVersion = async () => {
    const version = await DeviceInfo.getVersion();
    const buildNumber = await DeviceInfo.getBuildNumber();
    setVersion(`v${version} (${buildNumber})`);
  };

  useEffect(() => {
    loadVersion().then();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={MeditationListIcon} />
      <Text style={styles.title}>{t('SETTINGS')}</Text>
      <View style={styles.rectangle} />
      <ScrollView style={styles.containerItem}>
        <View style={styles.scroll}>
          {_renderSettingsItem(SettingsRateAppIcon, t('Rate_App'), _rateApp)}
          {_renderSettingsItem(
            SettingsSubscriptionIcon,
            t('Subscription'),
            _subscription,
          )}
          {_renderSettingsDocumentItem(SettingsSupportIcon, t('Support'), {
            title: t('Support'),
            key: keys.support,
          })}
          {_renderSettingsDocumentItem(SettingsPrivacyPolicyIcon, t('Privacy_Policy'), {
            title: t('Privacy_Policy'),
            key: keys.privacy,
          })}
          {_renderSettingsDocumentItem(
            SettingsTermsConditionsIcon,
            t('Terms_Conditions'),
            {title: t('Terms_Conditions'), key: keys.terms},
          )}
        </View>
      </ScrollView>
      <View style={styles.versionContainer}>
        <Text style={styles.version}>{version}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: ColorPalette.grayBlack_393737,
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
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
  },
  rectangle: {
    height: '70%',
    width: '85%',
    backgroundColor: ColorPalette.white,
    borderRadius: 50,
    position: 'absolute',
    opacity: 0.1,
    bottom: '5%',
  },
  containerItem: {
    flex: 1,
    width: UiUtils.getWindowWidth(),
    overflow: 'hidden',
    marginTop: 10,
  },
  circleItem: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: ColorPalette.white,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  settingsIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 35,
    width: 35,
    marginTop: 20,
  },
  iconText: {
    flex: 1,
    color: ColorPalette.grayBlack_393737,
    textAlign: 'center',
    fontFamily: Fonts.CenturyGothicBold,
    fontSize: 12,
    marginTop: 4,
  },
  scroll: {
    alignItems: 'center',
  },
  versionContainer: {
    position: 'absolute',
    right: 0,
    top: UiUtils.getStatusBarHeight(),
    marginTop: 4,
    marginRight: 8,
    opacity: 0.3,
  },
  version: {
    color: 'white',
  },
});

export default Settings;
