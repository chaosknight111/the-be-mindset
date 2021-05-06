import i18n from 'i18next';
import AppLoading from 'presentation/app/AppLoading';
import * as React from 'react';
import {useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import AppInitializer from './presentation/app/AppInitializer';
import Router from './presentation/ui/Router';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={AppInitializer.initAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  );
};

// noinspection JSUnusedGlobalSymbols
export default App;
