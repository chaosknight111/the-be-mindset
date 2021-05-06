import Document from 'entities/Document';

export default interface IDocumentManager {
  loadDocument(key: string): Promise<void>;
  getDocument(key: string): Document | undefined;
}
