import {Dimensions, Platform, StatusBar, NativeModules} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIPhoneX =
    (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
    (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
}

export default {
  getStatusBarHeight: (skipAndroid: boolean = false) => {
    return Platform.select({
      ios: isIPhoneX ? 44 : 20,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
    });
  },

  getNavigationBarHeight: () => {
    return 50;
  },
  getWindowWidth: () => {
    const {width} = Dimensions.get('window');
    return width;
  },

  getWindowHeight: () => {
    const {height} = Dimensions.get('window');
    return height;
  },

  getQuantityGridItems: (itemWidth: number, marginItems: number) => {
    return Math.floor((Dimensions.get('window').width - 75) / (itemWidth + marginItems));
  },

  isIPad: () => {
    if (Platform.OS !== 'ios') return false;

    const platformConstants = NativeModules.PlatformConstants;
    const {interfaceIdiom} = platformConstants;
    return interfaceIdiom === 'pad';
  },
};
