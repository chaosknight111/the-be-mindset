import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Section from 'entities/Section';
import ColorPalette from 'resources/ColorPalette';
import Fonts, {FontSizes} from 'resources/Fonts';
import {Observer} from 'mobx-react';
import {SectionsManager} from 'domain/managers';
import {LockedSection} from 'assets/Images';

interface MeditationsListItemProps {
  section: Section;
  onPress: () => void;
}

const MeditationSectionsItem: React.FunctionComponent<MeditationsListItemProps> = ({
  section,
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.touchHandle} activeOpacity={0.9} onPress={onPress}>
        <>
          <Image style={styles.postImage} source={{uri: section.image.uri}} />
          <Observer>
            {() =>
              SectionsManager.isLocked(section) ? (
                <View style={styles.lockedOpacity}>
                  <Image source={LockedSection} style={styles.locked} />
                </View>
              ) : (
                <></>
              )
            }
          </Observer>
          <Text style={{...styles.postTitle, color: section.textColor}}>
            {section.title}
          </Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postImage: {
    position: 'relative',
    width: '100%',
    height: '65%',
    borderRadius: 40,
    marginTop: 0,
    backgroundColor: ColorPalette.gray_d2d2d2b0,
  },
  postTitle: {
    position: 'absolute',
    color: ColorPalette.blue_038da1,
    fontSize: FontSizes._23,
    fontFamily: Fonts.CenturyGothicBold,
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 33,
    marginRight: 33,
  },
  touchHandle: {
    height: '85%',
  },
  locked: {
    position: 'absolute',
    zIndex: 100,
    height: 25,
    width: 20,
    bottom: 40,
    right: 40,
  },
  lockedOpacity: {
    position: 'absolute',
    backgroundColor: ColorPalette.black,
    borderRadius: 40,
    opacity: 0.4,
    height: '65%',
    width: '100%',
  },
});

export default MeditationSectionsItem;
