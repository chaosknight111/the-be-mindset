import {CacheResult} from './CacheResult';

export default interface IFileStorage {
  cacheFileAsync(uri: string): Promise<CacheResult>;
  deleteFileAsync(fileUri: string): Promise<boolean>;
}
