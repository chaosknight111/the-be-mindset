import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CloseBtnWhite} from 'assets/Images';
import Spacings from 'resources/Spacings';
import {Navigator} from 'presentation/ui/Navigation';
import UiUtils from 'presentation/ui/utils/UiUtils';

interface CloseButtonProps {
  onPress?: () => void;
}

const CloseButton: React.FunctionComponent<CloseButtonProps> = ({onPress}) => {
  const _onPressBackButton = () => {
    if (onPress) {
      onPress();
      return;
    }

    Navigator.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.backButtonContainer}
      activeOpacity={0.9}
      onPress={_onPressBackButton}
    >
      <Image source={CloseBtnWhite} style={styles.backButton} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: UiUtils.getStatusBarHeight(),
    right: Spacings.x3_12,
    padding: Spacings.x2_8,
    zIndex: 1,
  },
  backButton: {
    flex: 1,
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
});

export default CloseButton;
