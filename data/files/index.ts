import FileStorage from './FileStorage';
import IFileStorage from './IFileStorage';

const fileStorage: IFileStorage = new FileStorage();

export {fileStorage as FileStorage};
