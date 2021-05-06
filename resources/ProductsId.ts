export type ProductId = {
  android: string;
  iOS: string;
};

const monthly: ProductId = {
  android: 'com.thebemindset.monthly',
  iOS: 'com.thebemindset.monthly',
};

const lifelong: ProductId = {
  android: 'com.thebemindset.lifelong',
  iOS: 'com.thebemindset.lifelongsubs',
};

const yearlyOld: ProductId = {
  android: 'com.thebemindset.yearly',
  iOS: 'com.thebemindset.yearlysubs',
};

const yearlyWithTrial: ProductId = {
  android: 'com.thebemindset.yearlyfreetrial',
  iOS: 'com.thebemindset.yearlyfreetialsubs',
};

export default {
  monthly,
  yearlyOld,
  lifelong,
  yearlyWithTrial,
};
