import React from 'react';
import {StyleSheet, Text, View, Image, ImageSourcePropType} from 'react-native';
import Spacings from 'resources/Spacings';
import Fonts, {FontSizes} from 'resources/Fonts';
import ColorPalette from 'resources/ColorPalette';

interface SellingPointItemProps {
  text: string;
  icon: ImageSourcePropType;
}

const SellingPointItem: React.FC<SellingPointItemProps> = ({text, icon}) => {
  return (
    <View style={styles.listItemContainer}>
      <Image source={icon} style={styles.listItemIcon} />
      <Text style={styles.listItemText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    padding: Spacings.x2_8,
    alignItems: 'center',
  },
  listItemIcon: {
    height: 20,
    width: 20,
    marginRight: Spacings.x3_12,
  },
  listItemText: {
    fontSize: FontSizes._17,
    color: ColorPalette.white,
    fontFamily: Fonts.CenturyGothic,
    letterSpacing: 1,
  },
});

export default SellingPointItem;
