export interface Button {
  text: string;
  onPress: () => void;
}

export default interface IAlertService {
  showMessage(
    title: string,
    message: string,
    positiveBtn?: string,
    callbackPositive?: () => void,
    negativeBtn?: string,
    callbackNegative?: () => void,
  ): void;

  showError(title: string, message: string): void;
}
