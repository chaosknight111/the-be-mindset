import {getMeditationMetadata, MeditationMetadata} from './Metadata';

type MeditationActionProperties = {
  Action: string;
};

const MeditationActions = {
  started: 'Started',
  paused: 'Paused',
  restarted: 'Restarted',
  finished: 'Finished',
};

type MeditationStarted = {
  key: 'started' | 'restarted';
} & MeditationMetadata;

type MeditationPaused = {
  key: 'paused';
} & MeditationMetadata;

type MeditationStopped = {
  key: 'finished';
} & MeditationMetadata;

export type MeditationAction = MeditationStarted | MeditationPaused | MeditationStopped;

const getMetadata = (meditationAction: MeditationAction) => {
  switch (meditationAction.key) {
    case 'started':
    case 'paused':
    case 'restarted':
    case 'finished':
      return getMeditationMetadata(meditationAction);
    default:
      return undefined;
  }
};

export const getMeditationActionProperties = (
  meditationAction: MeditationAction,
): MeditationActionProperties => {
  return {
    Action: MeditationActions[meditationAction.key],
    ...getMetadata(meditationAction),
  };
};
