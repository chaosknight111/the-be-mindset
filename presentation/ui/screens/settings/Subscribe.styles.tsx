import {StyleSheet} from 'react-native';
import ColorPalette from '../../../../resources/ColorPalette';
import Fonts, {FontSizes} from '../../../../resources/Fonts';
import UiUtils from '../../utils/UiUtils';

export const createStyles = () => {
  const sm = UiUtils.getWindowHeight() < 700;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorPalette.grayBlack_393737,
    },
    headerContainer: {
      alignItems: 'flex-start',
      flex: 1,
      marginHorizontal: '8%',
      justifyContent: 'space-around',
    },
    icon: {
      marginTop: 25,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: 20,
      height: (UiUtils.getWindowHeight() / 100) * 5,
      aspectRatio: 1,
    },
    rectangle: {
      height: '95%',
      width: '105%',
      backgroundColor: ColorPalette.white,
      borderRadius: 50,
      alignSelf: 'center',
      position: 'absolute',
      opacity: 0.1,
      top: '25%',
    },
    titleContainer: {
      marginTop: sm ? 10 : '10%',
      alignItems: 'center',
      alignSelf: 'center',
    },
    title1: {
      marginTop: 15,
      width: '100%',
      color: ColorPalette.yellow_ffd000,
      fontSize: sm?14:15,
      fontFamily: Fonts.CenturyGothicBold,
      textAlign: 'center',
      marginBottom: sm?0:'3%',
    },
    title2: {
      width: '100%',
      color: ColorPalette.yellow_ffd000,
      fontSize: sm?18:20,
      fontFamily: Fonts.CenturyGothicBold,
      textAlign: 'center',
      marginBottom: sm?0:'3%',
    },
    title3: {
      width: '100%',
      color: ColorPalette.yellow_ffd000,
      fontSize: sm?14:15,
      fontFamily: Fonts.CenturyGothicBold,
      textAlign: 'center',
      marginBottom: 30,
    },
    subtitle: {
      width: '100%',
      color: ColorPalette.white,
      fontSize: sm?13:14,
      fontFamily: Fonts.CenturyGothic,
      textAlign: 'center',
      paddingHorizontal: 10,
      marginBottom: 30,
    },
    goalContainer: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      marginBottom: sm?7:15,
      alignItems: 'center',
    },
    goalIcon: {
      height: 15,
      width: 15,
    },
    goals: {
      textAlign: 'left',
      fontFamily: Fonts.CenturyGothic,
      fontSize: sm?13:15,
      color: ColorPalette.white,
      marginLeft: 10,
    },
    subRenderItemContainer: {
      alignContent: 'center',
    },
    subContainer: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 5,
    },
    subTimeContainer: {
      flex: 1,
      backgroundColor: '#c1dff0',
      textAlign: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    subTime: {
      alignSelf: 'center',
      fontSize: 16,
      color: ColorPalette.black,
      fontFamily: Fonts.CenturyGothic,
      marginBottom: 10,
      marginTop: 10,
    },
    subPrice: {
      fontSize: 17,
      color: ColorPalette.white,
      fontFamily: Fonts.CenturyGothicBold,
    },
    boughtSub: {
      fontFamily: Fonts.CenturyGothicBold,
      fontSize: FontSizes._25,
      color: ColorPalette.white,
      textAlign: 'center',
      marginTop: 10,
    },
    cancellableText: {
      alignSelf: 'center',
      fontSize: FontSizes._17,
      color: ColorPalette.white,
      fontFamily: Fonts.CenturyGothic,
    },
    restoreBtn: {
      height: 28,
      marginRight: 15,
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
    },
    selectedPurchaseBackground: {
      flex: 1,
      flexDirection: 'column',
    },
    boughtSubContainer: {
      flex: 1,
      marginBottom: 15,
      justifyContent: 'center',
    },
    restoreBtnText: {
      fontFamily: Fonts.CenturyGothicBold,
      fontSize: FontSizes._13,
      color: 'rgba(255,255,255,0.5)',
      textAlign: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
  });
};
