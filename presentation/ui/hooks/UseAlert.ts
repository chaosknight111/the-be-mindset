import {Alert, AlertButton} from 'react-native';
import {useTranslation} from 'react-i18next';

type UseAlertsResponse = {
  showAlert(
    message: string,
    title: string,
    positiveBtn?: string,
    callbackPositive?: () => void,
    negativeBtn?: string,
    callbackNegative?: () => void,
  ): void;
  showError(message: string, title?: string): void;
};

export function useAlerts(): UseAlertsResponse {
  const {t} = useTranslation();

  const showAlert = (
    message: string,
    title: string,
    positiveBtn?: string,
    callbackPositive?: () => void,
    negativeBtn?: string,
    callbackNegative?: () => void,
  ) => {
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
  };

  const showError = (message: string, title?: string) => {
    showAlert(message, title || t('OopsE'));
  };

  return {
    showAlert,
    showError,
  };
}
