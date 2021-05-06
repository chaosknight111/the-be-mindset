import MixpanelConfiguration from './instance/MixpanelConfiguration';

const dev: MixpanelConfiguration = {
  token: '11d75cc198dfe7fcc92ca6b72090b1b8',
};

const test: MixpanelConfiguration = {
  token: '88c26a30d27eb022735df13ba9176ac8',
};

const production: MixpanelConfiguration = {
  token: '5ebf52ea2e69f7b12fa7124ed5021552',
};

const config = {
  dev,
  test,
  production,
};

export {config as MixpanelConfiguration};
