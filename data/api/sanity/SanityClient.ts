// @ts-ignore
import imageUrlBuilder from '@sanity/image-url';
// @ts-ignore
import sanityClient from '@sanity/client';
// @ts-ignore
import toMarkdown from '@sanity/block-content-to-markdown';
import SanityClientConfiguration from 'data/api/sanity/SanityClientConfiguration';

export default class SanityClient {
  private readonly client: any;

  private readonly imageUrlBuilder: any;

  constructor(private config: SanityClientConfiguration) {
    this.client = sanityClient({
      projectId: config.projectId,
      dataset: config.dataset,
      token: config.token,
      useCdn: config.useCdn,
    });
    this.imageUrlBuilder = imageUrlBuilder(this.client);
  }

  public urlForImage(source: string) {
    // TODO: set image size
    const width = 800;
    return this.imageUrlBuilder
      .image(source)
      .width(width)
      .url();
  }

  public urlForTrack(source: string) {
    const hardStart = `https://cdn.sanity.io/files/${this.config.projectId}/${this.config.dataset}/`;
    return hardStart + source.slice(5).replace('-', '.');
  }

  public fetch<Result>(query: string, params: any): Promise<Result> {
    return this.client.fetch(query, params);
  }

  // noinspection JSMethodCanBeStatic
  public markdownForBlock(blockText: any) {
    const serializers = {
      types: {
        code: (props: any) => `\`\`\`${props.node.language}\n${props.node.code}\n\`\`\``,
      },
    };

    return toMarkdown(blockText, {serializers});
  }
}
