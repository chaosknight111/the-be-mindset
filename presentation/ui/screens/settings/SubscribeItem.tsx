import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  View,
  Image,
} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import Fonts from 'resources/Fonts';
import Subscription, {SubscriptionType} from 'entities/Subscription';
import {useTranslation} from 'react-i18next';
import {SubscriptionDiscountImage} from 'assets/Images';

interface viewStyleProps {
  backgroundImageHeight: number;
  viewTimeColor: string;
  margin?: number;
  flex: number;
}

interface SubscribeItemProps {
  backgroundImage: ImageSourcePropType;
  onPress: () => void;
  subscription: Subscription;
  viewStyleProps: viewStyleProps;
  isYearly?: boolean;
  isLifetime?: boolean;
}

const SubscribeItem: React.FC<SubscribeItemProps> = ({
  backgroundImage,
  onPress,
  subscription,
  viewStyleProps,
  isLifetime,
  isYearly,
}) => {
  const {t} = useTranslation('subscribe');

  const _getSubscriptionTitle = (item: SubscriptionType): string => {
    switch (item) {
      case SubscriptionType.monthly:
        return t('Monthly');
      case SubscriptionType.yearlyWithTrial:
      case SubscriptionType.yearlyOld:
        return t('Yearly');
      case SubscriptionType.lifelong:
        return t('Lifelong');
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      key={subscription.subscriptionType.toString()}
      style={{
        ...styles.mainContainer,
        marginBottom: viewStyleProps.margin,
        flex: viewStyleProps.flex,
      }}
      activeOpacity={0.6}
    >
      <View
        style={{
          ...styles.textTitleContainer,
          backgroundColor: viewStyleProps.viewTimeColor,
        }}
      >
        <Text style={styles.textTitle}>
          {_getSubscriptionTitle(subscription.subscriptionType)}
        </Text>
      </View>
      <ImageBackground
        source={backgroundImage}
        style={{height: viewStyleProps.backgroundImageHeight, width: 'auto'}}
        imageStyle={{resizeMode: 'cover'}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(49, 60, 83, 0.9)',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {isYearly ? (
            <Text style={{...styles.subPrice, marginTop: 34}}>
              {subscription.localizedPrice}
            </Text>
          ) : (
            <Text style={styles.subPrice}>{subscription.localizedPrice}</Text>
          )}
          {isLifetime ? (
            <Image source={SubscriptionDiscountImage} style={styles.discountImage} />
          ) : null}
          {isYearly ? <Text style={styles.freeTrial}>{t('Free_Trial')}</Text> : null}
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Text style={styles.buyItemTextBtn}>{t('Buy_Item')}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 3,
  },
  textTitleContainer: {
    height: 80,
    maxHeight: 40,
    backgroundColor: '#f4e409',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: ColorPalette.black,
    fontFamily: Fonts.CenturyGothic,
  },
  textTitle: {
    fontSize: 16,
    color: ColorPalette.black,
    fontFamily: Fonts.CenturyGothic,
  },
  subPrice: {
    fontSize: 17,
    color: ColorPalette.white,
    fontFamily: Fonts.CenturyGothicBold,
    marginTop: 15,
    textAlign: 'center',
  },
  buyItemBtn: {
    backgroundColor: '#75efe4',
    height: 20,
    width: 70,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buyItemTextBtn: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.CenturyGothicBold,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#75efe4',
    width: 90,
    borderRadius: 5,
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  discountImage: {
    height: 30,
    width: 70,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  freeTrial: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#d2cd2b',
    fontFamily: Fonts.CenturyGothicBoldItalic,
    maxHeight: 80,
    maxWidth: 80,
    fontSize: 12,
  },
});

export default SubscribeItem;
