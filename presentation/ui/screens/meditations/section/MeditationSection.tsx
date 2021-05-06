import React from 'react';
import {FlatList, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import UiUtils from 'presentation/ui/utils/UiUtils';
import Fonts, {FontSizes} from 'resources/Fonts';
import ColorPalette from 'resources/ColorPalette';
import Section from 'entities/Section';
import MeditationSectionItem from 'presentation/ui/screens/meditations/section/MeditationSectionItem';
import Meditation from 'entities/Meditation';
import {Navigator} from 'presentation/ui/Navigation';
import BackButton from 'presentation/ui/components/common/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import StatusBar from 'presentation/ui/components/common/StatusBar';

export interface MeditationSectionProps {
  section: Section;
}

const MeditationSection: React.FunctionComponent<MeditationSectionProps> = ({
  section,
}) => {
  const _meditationItemPressed = (meditation: Meditation) => {
    Navigator.navigateToMeditationPlayerScreen(section, meditation);
  };

  const _renderMeditationItem = (meditation: Meditation) => (
    <MeditationSectionItem
      meditation={meditation}
      onPress={() => _meditationItemPressed(meditation)}
    />
  );

  return (
    <ImageBackground
      blurRadius={Platform.OS == 'android' ? 1 : 3}
      style={styles.background}
      source={{uri: section.image.uri}}
    >
      <StatusBar barStyles={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        style={styles.container}
        colors={['#2828287f', '#28282800', '#28282800']}
      >
        <View style={{flex: 1}}>
          <View style={styles.rectangle} />
          <View>
            <BackButton />
          </View>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.subtitle}>{section.subtitle}</Text>
          <View style={styles.flatList}>
            <FlatList
              data={section.meditations}
              renderItem={({item}) => _renderMeditationItem(item)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: ColorPalette.blackShadow_20_00000020,
    flex: 1,
  },
  title: {
    marginTop: UiUtils.getStatusBarHeight() + 10,
    fontSize: FontSizes._23,
    textAlign: 'center',
    fontFamily: Fonts.CenturyGothicBold,
    marginLeft: 50,
    marginRight: 50,
    color: ColorPalette.white,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: Fonts.CenturyGothicBold,
    fontSize: FontSizes._12,
    color: ColorPalette.white,
    marginTop: 5,
    marginBottom: 16,
    marginLeft: 80,
    marginRight: 80,
  },
  flatList: {
    flex: 1,
  },
  rectangle: {
    height: '60%',
    width: '15%',
    backgroundColor: ColorPalette.blueTurquoise_1db5b6,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    opacity: 0.1,
    bottom: '10%',
  },
});

export default MeditationSection;
