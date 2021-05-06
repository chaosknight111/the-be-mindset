import React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Meditation from 'entities/Meditation';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import {Observer} from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

interface MeditationGridItemProps {
  meditation: Meditation;
  height: number;
  width: number;
  onPress: () => void;
  isActionActive: () => boolean;
  onActionPress: (newState: boolean) => void;
  actionIcon: ImageSourcePropType;
  activeActionIconTintColor: string;
  inactiveActionIconTintColor: string;
  margin: number;
}

const MeditationsGridItem: React.FC<MeditationGridItemProps> = ({
  meditation,
  width,
  height,
  onPress,
  isActionActive,
  onActionPress,
  actionIcon,
  activeActionIconTintColor,
  inactiveActionIconTintColor,
  margin,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        style={{
          ...styles.itemContainer,
          height,
          width,
          marginLeft: margin,
          marginRight: margin,
        }}
        imageStyle={{borderRadius: 35}}
        source={{uri: meditation.image.uri}}
      >
        <LinearGradient
          style={styles.gradient}
          colors={['#2828287f', '#28282800', '#28282800']}
        >
          <Text style={styles.text}>{meditation.title}</Text>
        </LinearGradient>
        <Observer>
          {() => {
            const isActionActive_ = isActionActive();
            return (
              <View>
                <TouchableOpacity
                  style={styles.touchStyle}
                  onPress={() => onActionPress(!isActionActive_)}
                >
                  {isActionActive_ ? (
                    <Image
                      style={{
                        tintColor: activeActionIconTintColor,
                      }}
                      source={actionIcon}
                    />
                  ) : (
                    <Image
                      style={{tintColor: inactiveActionIconTintColor}}
                      source={actionIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        </Observer>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginTop: '15%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    color: ColorPalette.white,
    fontSize: FontSizes._20,
    fontFamily: Fonts.CenturyGothicBold,
    marginTop: 15,
  },
  touchStyle: {
    width: 30,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  gradient: {
    backgroundColor: ColorPalette.blackShadow_20_00000020,
    borderRadius: 35,
    height: '105%',
  },
});

export default MeditationsGridItem;
