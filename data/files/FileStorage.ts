import RNFS, {CachesDirectoryPath, DownloadFileOptions} from 'react-native-fs';
import uuid from 'uuid/v4';
import IFileStorage from './IFileStorage';
import {CacheResult} from 'data/files/CacheResult';

export default class FileStorage implements IFileStorage {
  public async cacheFileAsync(uri: string) {
    const name = uuid();
    const path = `${CachesDirectoryPath}${name}.mp3`;
    return FileStorage.downloadAsync(uri, path);
  }

  public async deleteFileAsync(fileUri: string) {
    const fileExist = await RNFS.exists(fileUri);
    if (!fileExist) return false;

    await RNFS.unlink(fileUri);
    return true;
  }

  private static async getFileInfo(fileUri: string): Promise<CacheResult> {
    const fileStats = await RNFS.stat(fileUri);
    return {
      uri: fileStats.path,
      name: fileStats.name,
    };
  }

  private static async downloadAsync(uri: string, fileUri: string) {
    const fileExist = await RNFS.exists(fileUri);
    if (fileExist) {
      return await FileStorage.getFileInfo(fileUri);
    }
    const downloadOptions: DownloadFileOptions = {
      fromUrl: uri,
      toFile: fileUri,
    };
    await RNFS.downloadFile(downloadOptions).promise;
    return await FileStorage.getFileInfo(fileUri);
  }
}
