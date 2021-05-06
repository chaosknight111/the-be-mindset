import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts, {FontSizes} from 'resources/Fonts';
import ColorPalette from 'resources/ColorPalette';
import Meditation from 'entities/Meditation';
import UiUtils from 'presentation/ui/utils/UiUtils';
import Spacings from 'resources/Spacings';

interface MeditationSectionProps {
  meditation: Meditation;
  onPress: () => void;
}

const MeditationSectionItem: React.FunctionComponent<MeditationSectionProps> = ({
  meditation,
  onPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.list} onPress={onPress} activeOpacity={0.7}>
      <Image source={{uri: meditation.image.uri}} style={styles.categoryImage} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryTitle}>{meditation.title}</Text>
        <Text style={styles.categorySubtitle} numberOfLines={2} lineBreakMode="tail">
          {meditation.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  list: {
    textAlign: 'center',
    fontFamily: Fonts.CenturyGothic,
    fontSize: FontSizes._14,
    color: ColorPalette.white,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  categoryImage: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginLeft: 30,
    backgroundColor: ColorPalette.white,
  },
  textContainer: {
    marginLeft: Spacings.x4_16,
    marginRight: Spacings.x2_8,
    flex: 1,
  },
  categoryTitle: {
    color: ColorPalette.white,
    fontFamily: Fonts.CenturyGothicBold,
    fontSize: 25,
  },
  categorySubtitle: {
    height: 35,
    color: ColorPalette.white,
    fontSize: 14,
    fontFamily: Fonts.CenturyGothicBold,
  },
  rectangle: {
    height: '40%',
    width: UiUtils.getWindowWidth(),
    backgroundColor: ColorPalette.blueTurquoise_1db5b6,
    borderRadius: 50,
    position: 'absolute',
    opacity: 0.7,
    bottom: '30%',
  },
});

export default MeditationSectionItem;
