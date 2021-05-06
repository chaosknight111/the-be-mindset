import AudioPlayer from './AudioPlayer';
import IAudioPlayer from './IAudioPlayer';

const audioPlayer: IAudioPlayer = new AudioPlayer();

export {audioPlayer as AudioPlayer};
