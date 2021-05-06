import * as React from 'react';
import {FunctionComponent} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import UiUtils from 'presentation/ui/utils/UiUtils';

interface TabItemIconProps {
  icon: ImageSourcePropType;
  focused: boolean;
}

const TabItemIcon: FunctionComponent<TabItemIconProps> = ({icon, focused}) => (
  <View style={styles.container}>
    <Image
      source={icon}
      style={{
        ...styles.image,
        tintColor: focused ? ColorPalette.orange_e8970c : ColorPalette.grayBlack_393737,
      }}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(UiUtils.isIPad()
      ? {
          justifyContent: 'center',
        }
      : undefined),
  },
  image: {
    height: 22,
    ...(UiUtils.isIPad()
      ? {
          width: 20,
        }
      : undefined),
  },
});

export default TabItemIcon;
