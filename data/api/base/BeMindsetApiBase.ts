import SanityClient from 'data/api/sanity/SanityClient';
import Mappers from 'domain/mappers/Mappers';
import SanityClientConfiguration from 'data/api/sanity/SanityClientConfiguration';

export default class BeMindsetApiBase {
  private readonly client: SanityClient;

  protected readonly mappers: Mappers;

  constructor(config: SanityClientConfiguration) {
    this.client = new SanityClient(config);
    this.mappers = new Mappers(this.client);
  }

  public fetch<Result>(query: string, params: any = undefined): Promise<Result> {
    return this.client.fetch(query, params);
  }
}
