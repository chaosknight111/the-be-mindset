import {DocumentsManager} from 'domain/managers';
import {InformationDocumentProps} from 'presentation/ui/screens/settings/InformationDocument';

export default class InformationDocumentRouter {
  onEnter = async ({documentKey}: InformationDocumentProps) => {
    await DocumentsManager.loadDocument(documentKey);
  };
}
