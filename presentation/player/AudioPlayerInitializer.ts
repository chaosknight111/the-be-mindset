import SoundAudioPlayerImplementation from 'presentation/player/implementation/SoundAudioPlayerImplementation';

export default {
  initAsync: async () => {
    await SoundAudioPlayerImplementation.initialize();
  },
};
