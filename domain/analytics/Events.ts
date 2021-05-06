const Events = {
  appOpened: 'App opened',
  pageOpened: 'Page opened',
  buttonClicked: 'Button clicked',
  meditationAction: 'Meditation action',
  subscription: 'Subscription',
};

export type Event = keyof typeof Events;

export const getEventIdentifier = (event: Event) => {
  return Events[event];
};
