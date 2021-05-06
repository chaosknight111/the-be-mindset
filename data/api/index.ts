import BeMindsetApi from 'data/api/BeMindsetApi';
import {IBeMindsetApi} from 'data/api/IBeMindsetApi';
import {SanityClientConfiguration} from 'data/api/BeMindsetConfiguration';

const config = __DEV__
  ? SanityClientConfiguration.dev
  : SanityClientConfiguration.production;

const beMindsetApi: IBeMindsetApi = new BeMindsetApi(config);

export {beMindsetApi as BeMindsetApi, config as BeMindsetApiConfig};
