import React from 'react';
import {Image, ImageSourcePropType, SafeAreaView, Text, View} from 'react-native';
import {
  LifetimeSubscription,
  MeditationListIcon,
  MonthlySubscription,
  PointerWhite,
  YearlySubscription,
} from 'assets/Images';
import {useTranslation} from 'react-i18next';
import {state} from 'data/store';
import Subscription, {SubscriptionType} from 'entities/Subscription';
import {SubscriptionService} from 'presentation/services';
import {Observer} from 'mobx-react';
import {AlertService} from 'presentation/services/';
import i18next from 'i18next';
import SubscriptionItem from './SubscribeItem';
import BackButton from 'presentation/ui/components/common/BackButton';
import {AnalyticsTracker} from '../../../../domain/analytics';
import {createStyles} from './Subscribe.styles';

const Subscribe: React.FC = () => {
  const {t} = useTranslation('subscribe');

  const styles = createStyles();

  const _renderItemSubscription = (
    selectedSubscription: Subscription,
  ): React.ReactElement => {
    let textKey = '';
    switch (selectedSubscription.subscriptionType) {
      case SubscriptionType.monthly:
        textKey = 'Purchase_Monthly';
        break;
      case SubscriptionType.yearlyOld:
      case SubscriptionType.yearlyWithTrial:
        textKey = 'Purchase_Yearly';
        break;
      case SubscriptionType.lifelong:
        textKey = 'Purchase_Lifelong';
        break;
    }

    return (
      <View style={styles.boughtSubContainer}>
        <Text style={styles.boughtSub}>{t(textKey)}</Text>
      </View>
    );
  };

  const onPressBuyProduct = async (type: SubscriptionType) => {
    await AnalyticsTracker.trackButtonClicked({
      key: 'buySubscription',
      type,
      source: 'Subscription page',
    });
    await SubscriptionService.buySubscription(type);
  };

  const _renderGoalItem = (icon: ImageSourcePropType, text: string) => {
    return (
      <View style={styles.goalContainer}>
        <Image source={icon} style={styles.goalIcon} />
        <Text style={styles.goals}>{text}</Text>
      </View>
    );
  };

  const onPressRestoreSubscription = async () => {
    await SubscriptionService.restoreSubscriptions()
      .then()
      .catch();
    AlertService.showMessage(
      i18next.t('subscribe:Restore_Message'),
      i18next.t('subscribe:Restore_Title'),
      i18next.t('subscribe:Restore_PositiveBtn'),
      () => null,
    );
  };

  const _renderSingleItemPay = (
    subscription: Subscription,
    onPress: () => Promise<void>,
  ): React.ReactElement => {
    switch (subscription.subscriptionType) {
      case SubscriptionType.monthly:
        return (
          <SubscriptionItem
            onPress={onPress}
            subscription={subscription}
            backgroundImage={MonthlySubscription}
            viewStyleProps={{
              viewTimeColor: '#c2dff1',
              backgroundImageHeight: 130,
              flex: 0.8,
            }}
            key={subscription.subscriptionType}
          />
        );
      case SubscriptionType.yearlyWithTrial:
      case SubscriptionType.yearlyOld:
        return (
          <SubscriptionItem
            onPress={onPress}
            subscription={subscription}
            backgroundImage={YearlySubscription}
            viewStyleProps={{
              viewTimeColor: '#f4e409',
              backgroundImageHeight: 145,
              margin: 20,
              flex: 1,
            }}
            isYearly
            key={subscription.subscriptionType}
          />
        );
      case SubscriptionType.lifelong:
        return (
          <SubscriptionItem
            onPress={onPress}
            subscription={subscription}
            backgroundImage={LifetimeSubscription}
            viewStyleProps={{
              viewTimeColor: '#e4c1f9',
              backgroundImageHeight: 130,
              flex: 0.8,
            }}
            isLifetime
            key={subscription.subscriptionType}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.icon} source={MeditationListIcon} />
        <View style={styles.rectangle} />
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>{t('Title1')}</Text>
          <Text style={styles.title2}>{t('Title2')}</Text>
          <Text style={styles.title3}>{t('Title3')}</Text>
        </View>
        <Text style={styles.subtitle}>{t('Subtitle')}</Text>
        <View>
          {_renderGoalItem(PointerWhite, t('Goal_Get_Phases'))}
          {_renderGoalItem(PointerWhite, t('Goal_Full_Library'))}
          {_renderGoalItem(PointerWhite, t('Goal__Mindset_Transformation'))}
        </View>
      </View>

      <View style={styles.subContainer}>
        <Observer>
          {() => {
            return (
              <>
                {state.subscriptions.map((subscription) =>
                  _renderSingleItemPay(subscription, () =>
                    onPressBuyProduct(subscription.subscriptionType),
                  ),
                )}
              </>
            );
          }}
        </Observer>
      </View>

      <Text style={styles.cancellableText}>{t('Cancel_Payment')}</Text>

      <Observer>
        {() => {
          const selectedSubscription = SubscriptionService.getSelectedSubscription();
          return selectedSubscription ? (
            <View
              style={{
                flex: 1,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#151515ca',
                position: 'absolute',
              }}
            >
              <View style={styles.selectedPurchaseBackground}>
                {_renderItemSubscription(selectedSubscription)}
              </View>
            </View>
          ) : (
            <></>
          );
        }}
      </Observer>

      <View style={styles.restoreBtn}>
        <Text style={styles.restoreBtnText} onPress={() => onPressRestoreSubscription()}>
          {t('Restore_Subscription')}
        </Text>
      </View>

      <BackButton />
    </SafeAreaView>
  );
};

export default Subscribe;
