import RNIap from 'react-native-iap';

export type Iap = typeof RNIap;

export function createIapInstance(): Iap {
  return RNIap;
}
