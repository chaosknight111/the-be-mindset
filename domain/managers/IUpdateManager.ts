export default interface IUpdateManager {
  updateSections(): Promise<void>;
  updateExternalLinks(): Promise<void>;
}
