export default interface IExternalService {
  requestAppReview(): Promise<boolean>;
  openLink(link: string, useInAppBrowser: 'internal' | 'external'): Promise<void>;
}
