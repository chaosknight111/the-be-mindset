import {ObjectKeys, ObjectConstants} from 'data/api/entities/CommonObjects';

export default interface Document {
  document_title: string;
  document_key: string;
  document_text: string;
}

export class DocumentKeys extends ObjectKeys {
  document_title = 'document_title';

  document_key = 'document_key';

  document_text = 'document_text';

  get all() {
    return [...super.all, this.document_text, this.document_title, this.document_key];
  }
}

export class DocumentConstants extends ObjectConstants {
  type = 'documents';
}
