import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import CircularProgress from './CircularProgress';
import Fonts from 'resources/Fonts';
import {useTranslation} from 'react-i18next';

interface CircularProgressBarProps {
  fill: number;
  onFillChanged?: (fill: number) => void;
  icon: ImageSourcePropType;
  onIconTouch?: () => void;
  isLoaded: boolean;
}

const CircularProgressBar: React.FunctionComponent<CircularProgressBarProps> = ({
  fill,
  icon,
  onIconTouch,
  onFillChanged,
  isLoaded,
}) => {
  const {t} = useTranslation('common');

  return (
    <CircularProgress
      style={styles.circularProgress}
      size={240}
      width={3}
      fill={fill}
      onFillChanged={onFillChanged}
      tintColor={ColorPalette.orange_e8970c}
      backgroundColor={ColorPalette.white}
      rotation={0}
    >
      {() => (
        <View style={styles.playButton}>
          <TouchableOpacity onPress={onIconTouch}>
            {isLoaded ? (
              <Image style={styles.pauseButtonImg} source={icon} />
            ) : (
              <View>
                <ActivityIndicator size="large" color={ColorPalette.white} />
                <Text style={styles.loadingText}>{t('loading')}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </CircularProgress>
  );
};

const styles = StyleSheet.create({
  circularProgress: {
    marginTop: 70,
  },
  playButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButtonImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  loadingText: {
    color: ColorPalette.white,
    fontSize: 12,
    fontFamily: Fonts.CenturyGothic,
  },
});

export default CircularProgressBar;
