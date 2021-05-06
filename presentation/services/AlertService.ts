import {Alert, AlertButton} from 'react-native';
import IAlertService from './IAlertService';

export default class AlertService implements IAlertService {
  public showMessage(
    message: string,
    title: string,
    positiveBtn?: string,
    callbackPositive?: () => void,
    negativeBtn?: string,
    callbackNegative?: () => void,
  ) {
    const buttons: AlertButton[] = [];
    if (positiveBtn) {
      buttons.push({
        text: positiveBtn,
        onPress: callbackPositive,
      });
    }

    if (negativeBtn) {
      buttons.push({
        text: negativeBtn,
        onPress: callbackNegative,
      });
    }

    Alert.alert(title, message, buttons.length > 0 ? buttons : undefined);
  }

  public showError(title: string, message: string) {
    Alert.alert(title, message);
  }
}
