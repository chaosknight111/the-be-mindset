export interface ColorObject {
  hex: string;
}

export interface ImageObject {
  asset: {
    _ref: string;
  };
}

export interface TrackObject {
  asset: {
    _ref: string;
  };
}

export abstract class ObjectKeys {
  readonly _id = '_id';

  readonly _type = '_type';

  get all(): string[] {
    return [this._id];
  }
}

export abstract class ObjectConstants {
  abstract type: string;
}
