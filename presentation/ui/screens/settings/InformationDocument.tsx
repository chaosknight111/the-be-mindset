import React from 'react';
// @ts-ignore
import {MarkdownView} from 'react-native-markdown-view';
import {DocumentsManager} from 'domain/managers';
import {Observer} from 'mobx-react';
import {Platform, ScrollView, StyleSheet, View, Text} from 'react-native';
import ColorPalette from 'resources/ColorPalette';
import BackButton from 'presentation/ui/components/common/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import Fonts, {FontSizes} from 'resources/Fonts';
import {InformationDocumentBackground} from 'assets/Images';
import StatusBar from 'presentation/ui/components/common/StatusBar';

export interface InformationDocumentProps {
  title: string;
  documentKey: string;
}

const InformationDocument: React.FC<InformationDocumentProps> = ({documentKey}) => (
  <View style={styles.background}>
    <Observer>
      {() => {
        const document = DocumentsManager.getDocument(documentKey);
        const markdown = document ? document.markdownText : undefined;
        const title = document ? document.title : undefined;
        return (
          <View style={{flex: 1}}>
            <StatusBar />
            <BackButton />
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
              <MarkdownView style={styles.markdown} styles={markdownStyles}>
                {markdown}
              </MarkdownView>
            </ScrollView>
          </View>
        );
      }}
    </Observer>
  </View>
);

const markdownStyles = {
  heading1: {
    color: ColorPalette.white,
  },
  paragraph: {
    color: ColorPalette.white,
    fontFamily: Fonts.CenturyGothic,
  },
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '101%',
    backgroundColor: '#393737',
  },
  title: {
    width: '50%',
    marginLeft: '20%',
    textAlign: 'center',
    marginTop: 50,
    paddingBottom: 20,
    fontFamily: Fonts.CenturyGothicBold,
    fontSize: FontSizes._30,
    color: ColorPalette.white,
  },
  markdown: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: '4%',
    marginRight: '4%',
  },
  backgroundGradient: {
    backgroundColor: ColorPalette.blackShadow_10_00000010,
    flex: 1,
  },
});

export default InformationDocument;
