import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {LeftArrowWhite} from 'assets/Images';
import UiUtils from 'presentation/ui/utils/UiUtils';
import Spacings from 'resources/Spacings';
import {Navigator} from 'presentation/ui/Navigation';

interface BackButtonProps {
  onPress?: () => void;
}

const BackButton: React.FunctionComponent<BackButtonProps> = ({onPress}) => {
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
      <Image source={LeftArrowWhite} style={styles.backButton} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    top: UiUtils.getStatusBarHeight() + Spacings.x4_16,
    left: Spacings.x4_16,
    padding: Spacings.x2_8,
  },
  backButton: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default BackButton;
