import SanityClientConfiguration from 'data/api/sanity/SanityClientConfiguration';

const dev: SanityClientConfiguration = {
  projectId: 'l0e5olhs',
  dataset: 'dev',
  useCdn: true,
};

const production: SanityClientConfiguration = {
  projectId: 'srn6amqq',
  dataset: 'production',
  useCdn: true,
};

const config = {
  dev,
  production,
};

export {config as SanityClientConfiguration};
