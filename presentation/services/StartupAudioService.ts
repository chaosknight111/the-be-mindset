import IStartupAudioService from 'presentation/services/IStartupAudioService';
import Sound from 'react-native-sound';

export default class StartupAudioService implements IStartupAudioService {
  async playStartupAudio() {
    const sound = await this.createSound();
    sound.play();
  }

  private createSound(): Promise<Sound> {
    return new Promise((resolve, reject) => {
      const sound = new Sound('startup_audio.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(sound);
      });
    });
  }
}
