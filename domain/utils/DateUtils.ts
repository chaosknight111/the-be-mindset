import moment from 'moment';

export default {
  getCurrentMS: () => {
    return new Date().getTime();
  },

  diffDateMS: (now: number, lastUpdate: number) => {
    return moment(now).diff(lastUpdate);
  },
};
