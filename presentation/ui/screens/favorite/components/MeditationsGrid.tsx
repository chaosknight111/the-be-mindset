import React from 'react';
import {FlatList, ImageSourcePropType, View, StyleSheet} from 'react-native';
import MeditationsGridItem from './MeditationsGridItem';
import Meditation from 'entities/Meditation';
import UiUtils from 'presentation/ui/utils/UiUtils';
import ColorPalette from 'resources/ColorPalette';

const getQuantityGridItems = (itemWidth: number, marginItems: number) => {
  return Math.floor(UiUtils.getWindowWidth() / (itemWidth + marginItems));
};

const getItemWidth = (quantity: number, marginItems: number) => {
  const totalMargins = marginItems * 2 * (quantity + 1);
  return Math.floor((UiUtils.getWindowWidth() - totalMargins) / quantity);
};

const getItemHeight = (itemWidth: number) => {
  return Math.floor(itemWidth * 1.25);
};

interface MeditationsGridProps {
  meditations: Meditation[];
  onMeditationClick?: (meditation: Meditation) => void;
  isMeditationActionActive?: (meditation: Meditation) => boolean;
  onMeditationActionPress?: (meditation: Meditation, newState: boolean) => void;
  actionIconTintColor: ImageSourcePropType;
}

const MeditationsGrid: React.FC<MeditationsGridProps> = ({
  meditations,
  onMeditationClick,
  isMeditationActionActive,
  onMeditationActionPress,
  actionIconTintColor,
}) => {
  const itemsMargin = 8;
  const minItemWidth = 150;

  const quantity = getQuantityGridItems(minItemWidth, itemsMargin);
  const itemWidth = getItemWidth(quantity, itemsMargin);
  const itemHeight = getItemHeight(itemWidth);

  const _renderMeditationItem = (meditation: Meditation) => {
    return (
      <MeditationsGridItem
        height={itemHeight}
        width={itemWidth}
        meditation={meditation}
        onPress={() => (onMeditationClick ? onMeditationClick(meditation) : undefined)}
        isActionActive={() =>
          isMeditationActionActive ? isMeditationActionActive(meditation) : false
        }
        onActionPress={(newState) =>
          onMeditationActionPress
            ? onMeditationActionPress(meditation, newState)
            : undefined
        }
        actionIcon={actionIconTintColor}
        activeActionIconTintColor={ColorPalette.white}
        inactiveActionIconTintColor={ColorPalette.darkGray_8b8b8b}
        margin={itemsMargin}
      />
    );
  };

  return (
    <View style={{...styles.list, marginLeft: itemsMargin, marginRight: itemsMargin}}>
      <FlatList
        data={meditations}
        renderItem={({item}) => _renderMeditationItem(item)}
        keyExtractor={(item) => item.id}
        numColumns={quantity}
        alwaysBounceHorizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default MeditationsGrid;
