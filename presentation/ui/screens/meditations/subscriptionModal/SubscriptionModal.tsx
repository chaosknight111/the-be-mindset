import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MeditationListIcon, PointerWhite, ViewOtherIcon} from 'assets/Images';
import Fonts, {FontSizes} from 'resources/Fonts';
import ColorPalette from 'resources/ColorPalette';
import SellingPointItem from './SellingPointItem';
import Spacings from 'resources/Spacings';
import CloseButton from 'presentation/ui/components/common/CloseButton';
import {SubscriptionService} from 'presentation/services';
import {SubscriptionType} from 'entities/Subscription';
import {useTranslation} from 'react-i18next';
import UiUtils from 'presentation/ui/utils/UiUtils';
import {Navigator} from 'presentation/ui/Navigation';
import {state} from 'data/store';
import DateUtils from 'domain/utils/DateUtils';
import {AnalyticsTracker} from '../../../../../domain/analytics';

const SubscriptionModal: React.FC = () => {
  const {t} = useTranslation('subscriptionModal');

  const syncLastShown = () => {
    const current = DateUtils.getCurrentMS();
    state.setLastTimeShownSubscriptionModal(current);
  };

  const onClose = () => {
    syncLastShown();
    Navigator.goBack();
  };

  const onViewOtherPlans = () => {
    syncLastShown();
    Navigator.goBack();
    Navigator.navigateToSubscribe();
  };

  return (
    <SafeAreaView style={styles.background}>
      <CloseButton onPress={onClose}/>
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={styles.mainContentContainer}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.icon} source={MeditationListIcon}/>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('Header')}</Text>
          <Text style={styles.subtitleText}>{t('Subtitle')}</Text>
        </View>
        <View style={styles.sellingsPointsContainer}>
          <SellingPointItem text={t('Points1')} icon={PointerWhite}/>
          <SellingPointItem text={t('Points2')} icon={PointerWhite}/>
          <SellingPointItem text={t('Points3')} icon={PointerWhite}/>
          <SellingPointItem text={t('Points4')} icon={PointerWhite}/>
        </View>
        <View style={styles.getAccessButtonContainer}>
          <TouchableOpacity
            style={styles.getAccessButton}
            onPress={async () => {
              const type = SubscriptionType.yearlyWithTrial;

              await AnalyticsTracker.trackButtonClicked({
                key: 'buySubscription',
                type,
                source: 'Marketing popup',
              });

              await SubscriptionService.buySubscription(type);
            }}
          >
            <Text style={styles.getAccessButtonText}>{t('GetAccessButton')}</Text>
          </TouchableOpacity>
          <Text style={styles.freeTrialText}>{t('FreeTrialText')}</Text>
          <Text style={styles.cancelAnytimeText}>{t('CancelAnytime')}</Text>
        </View>
      </ScrollView>
      <View style={styles.viewOtherPlansContainer}>
        <Text style={styles.viewOtherPlansText}>{t('ViewOtherPlans')}</Text>
        <TouchableOpacity onPress={onViewOtherPlans}>
          <Image source={ViewOtherIcon} style={styles.viewOtherPlansIcon}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: ColorPalette.grayBlack_393737,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: UiUtils.getStatusBarHeight(),
  },
  icon: {
    marginTop: 10,
    height: (UiUtils.getWindowHeight() / 100) * 5,
    aspectRatio: 1,
  },
  headerContainer: {
    flex: 0.2,
  },
  headerText: {
    fontSize: FontSizes._30,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
    marginHorizontal: '5%',
    color: ColorPalette.yellow_ffd000,
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: FontSizes._15,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
    color: ColorPalette.yellow_ffd000,
    letterSpacing: 2,
    marginTop: 10,
  },
  sellingsPointsContainer: {
    flexGrow: 0.3,
    flex: 0.3,
    marginHorizontal: '10%',
    marginTop: 30,
  },
  getAccessButtonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  getAccessButton: {
    backgroundColor: ColorPalette.yellow_ffd000,
    borderRadius: 20,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getAccessButtonText: {
    color: ColorPalette.grayBlack_393737,
    fontSize: FontSizes._14,
    letterSpacing: 2,
    fontFamily: Fonts.CenturyGothicBold,
    padding: Spacings.x3_12,
  },
  freeTrialText: {
    color: ColorPalette.white,
    fontSize: FontSizes._11,
    fontFamily: Fonts.CenturyGothic,
    letterSpacing: 1,
    paddingTop: Spacings.x2_8,
    textAlign: 'center',
  },
  cancelAnytimeText: {
    color: ColorPalette.white,
    fontSize: FontSizes._11,
    fontFamily: Fonts.CenturyGothic,
    letterSpacing: 1,
    paddingTop: Spacings.x2_8,
    textAlign: 'center',
  },
  viewOtherPlansContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: Spacings.x3_12,
  },
  viewOtherPlansText: {
    color: ColorPalette.blue_78ffd6,
    fontFamily: Fonts.CenturyGothic,
    fontSize: FontSizes._11,
    paddingBottom: Spacings.x2_8,
    textAlign: 'center',
  },
  viewOtherPlansIcon: {
    height: 24,
    width: 24,
  },
  mainContent: {
    flexGrow: 2,
  },
  mainContentContainer: {
    flexGrow: 2,
  },
});

export default SubscriptionModal;
