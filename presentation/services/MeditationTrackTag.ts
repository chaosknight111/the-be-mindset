import Section from 'entities/Section';
import Meditation from 'entities/Meditation';

export default class MeditationTrackTag {
  constructor(public section: Section, public meditation: Meditation) {}
}
