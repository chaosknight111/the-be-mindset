import React, {useEffect} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import Fonts, {FontSizes} from 'resources/Fonts';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import TabItemIcon from 'presentation/ui/components/tabs/TabItemIcon';
import ColorPalette from 'resources/ColorPalette';
import Spacings from 'resources/Spacings';
import {
  TabsFavoritesIcon,
  TabsGuidedMeditationIcon,
  TabsSettingsIcon,
  TabsTheBeMindsetIcon,
} from 'assets/Images';
import {
  FavouriteMeditations,
  FavouriteMeditationsRouter,
  InformationDocument,
  InformationDocumentRouter,
  MeditationPlayer,
  MeditationPlayerRouter,
  MeditationSection,
  MeditationSectionRouter,
  MeditationSections,
  MeditationSectionsRouter,
  OfflineMeditations,
  OfflineMeditationsRouter,
  Settings,
  SettingsRouter,
  SubscriptionModal,
  TheBeMindset,
  SubscribeRouter,
  TheBeMindsetRouter,
  SubscriptionModalRouter,
} from 'presentation/ui/screens';
import {useTranslation} from 'react-i18next';
import {NavigatorKeys} from './Navigation';
import Subscribe from 'presentation/ui/screens/settings/Subscribe';
import {StartupAudioService} from 'presentation/services';

const AppRouter: React.FunctionComponent = () => {
  const {t} = useTranslation();

  useEffect(() => {
    StartupAudioService.playStartupAudio().then();
  }, []);

  const tabIcon = (icon: ImageSourcePropType) => (props: any) => (
    <TabItemIcon {...props} icon={icon} />
  );

  const meditationPlayerScene = () => (
    <Scene
      key={NavigatorKeys.MeditationPlayer}
      component={MeditationPlayer}
      onEnter={MeditationPlayerRouter.onEnter}
      onExit={MeditationPlayerRouter.onExit}
    />
  );

  const subscribeScene = () => (
    <Scene
      hideNavBar
      key={NavigatorKeys.Subscribe}
      component={Subscribe}
      onEnter={SubscribeRouter.onEnter}
    />
  );

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: ColorPalette.white,
      padding: Spacings.x2_8,
      height: 56,
    },
    tabLabel: {
      marginTop: Spacings.x1_4,
      marginBottom: 0,
      fontFamily: Fonts.CenturyGothicBold,
      fontSize: FontSizes._8,
    },
    tabSceneTitle: {
      fontFamily: Fonts.CenturyGothicBold,
    },
  });

  return (
    <Router>
      <Tabs
        tabBarStyle={styles.tabBar}
        labelStyle={styles.tabLabel}
        inactiveTintColor={ColorPalette.grayBlack_393737}
        activeTintColor={ColorPalette.orange_e8970c}
      >
        <Scene
          hideNavBar
          icon={tabIcon(TabsGuidedMeditationIcon)}
          title={t('TRAIN')}
          titleStyle={styles.tabSceneTitle}
        >
          <Scene
            key={NavigatorKeys.MeditationSections}
            component={MeditationSections}
            hideNavBar
            onEnter={MeditationSectionsRouter.onEnter}
          />
          <Scene
            hideNavBar
            key={NavigatorKeys.SubscriptionModal}
            component={SubscriptionModal}
            hideTabBar
            modal
            onEnter={SubscriptionModalRouter.onEnter}
          />
          {subscribeScene()}
          <Scene
            key={NavigatorKeys.MeditationSection}
            component={MeditationSection}
            onEnter={MeditationSectionRouter.onEnter}
          />
          {meditationPlayerScene()}
        </Scene>
        <Scene
          hideNavBar
          icon={tabIcon(TabsTheBeMindsetIcon)}
          title={t('CONNECT')}
          titleStyle={styles.tabSceneTitle}
        >
          <Scene
            key={NavigatorKeys.TheBeMindset}
            component={TheBeMindset}
            onEnter={TheBeMindsetRouter.onEnter}
          />
        </Scene>
        <Scene
          hideNavBar
          icon={tabIcon(TabsFavoritesIcon)}
          title={t('FAVORITES')}
          titleStyle={styles.tabSceneTitle}
        >
          <Scene
            key={NavigatorKeys.FavoriteMeditations}
            component={FavouriteMeditations}
            onEnter={FavouriteMeditationsRouter.onEnter}
          />
          <Scene
            key={NavigatorKeys.OfflineMeditations}
            component={OfflineMeditations}
            onEnter={OfflineMeditationsRouter.onEnter}
          />
          {meditationPlayerScene()}
        </Scene>
        <Scene
          hideNavBar
          icon={tabIcon(TabsSettingsIcon)}
          title={t('SETTINGS')}
          titleStyle={styles.tabSceneTitle}
        >
          <Scene
            key={NavigatorKeys.Settings}
            component={Settings}
            onEnter={SettingsRouter.onEnter}
          />
          <Scene
            hideNavBar
            renderBackButton={() => <></>}
            key={NavigatorKeys.InformationDocument}
            component={InformationDocument}
            onEnter={InformationDocumentRouter.onEnter}
          />
          {subscribeScene()}
        </Scene>
      </Tabs>
    </Router>
  );
};

export default AppRouter;
