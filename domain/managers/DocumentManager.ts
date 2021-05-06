import IDocumentManager from 'domain/managers/IDocumentManager';
import Document from 'entities/Document';
import {action} from 'mobx';
import {state} from 'data/store';
import {IBeMindsetApi} from 'data/api/IBeMindsetApi';

export default class DocumentManager implements IDocumentManager {
  constructor(private api: IBeMindsetApi) {}

  async loadDocument(key: string) {
    const document = await this.api.getDocument(key);
    this.setDocument(key, document);
  }

  getDocument(key: string) {
    return state.documents.get(key);
  }

  @action private setDocument(key: string, document: Document | undefined) {
    if (document) {
      state.documents.set(document.key, document);
    } else {
      state.documents.delete(key);
    }
  }
}
