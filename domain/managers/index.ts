import {BeMindsetApi} from 'data/api';
import ISectionsManager from './ISectionsManager';
import SectionsManager from './SectionsManager';
import IMeditationsManager from './IMeditationsManager';
import MeditationsManager from './MeditationsManager';
import IDocumentsManager from './IDocumentManager';
import DocumentsManager from './DocumentManager';
import IUpdateManager from './IUpdateManager';
import UpdateManager from './UpdateManager';
import IExternalLinkManager from './IExternalLinkManager';
import ExternalLinkManager from './ExternalLinkManager';

const sectionsManager: ISectionsManager = new SectionsManager(BeMindsetApi);
const meditationsManager: IMeditationsManager = new MeditationsManager();
const externalLinkManager: IExternalLinkManager = new ExternalLinkManager(BeMindsetApi);
const documentsManager: IDocumentsManager = new DocumentsManager(BeMindsetApi);
const updateManager: IUpdateManager = new UpdateManager(
  sectionsManager,
  externalLinkManager,
);

export {
  sectionsManager as SectionsManager,
  meditationsManager as MeditationsManager,
  documentsManager as DocumentsManager,
  updateManager as UpdateManager,
};
