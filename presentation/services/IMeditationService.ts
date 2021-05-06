import Section from 'entities/Section';
import Meditation from 'entities/Meditation';

export default interface IMeditationService {
  play(section: Section, meditation: Meditation, redirect: boolean): Promise<void>;
  stop(): Promise<void>;

  playPrevious(
    section: Section,
    meditation: Meditation,
    redirect: boolean,
  ): Promise<void>;
  playNext(section: Section, meditation: Meditation, redirect: boolean): Promise<void>;
}
