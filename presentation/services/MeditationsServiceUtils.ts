import Track from 'presentation/player/Track';
import MeditationTrackTag from 'presentation/services/MeditationTrackTag';

export const extractMeditationTag = (track: Track): MeditationTrackTag | null => {
  const {tag} = track;
  if (tag instanceof MeditationTrackTag) {
    return tag;
  }
  return null;
};
