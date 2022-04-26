export type IPFSUrl = string;
export type PositiveInteger = number;

export interface ImageSources {
    original: ImageMetadata;
    alternatives?: ImageMetadata[];
    [k: string]: unknown;
  }
  export interface ImageMetadata {
    src: IPFSUrl;
    mimeType: string;
    width: PositiveInteger;
    height: PositiveInteger;
    size?: PositiveInteger;
    [k: string]: unknown;
  }

export interface Conference {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    image?: ImageSources;
    [k: string]: unknown;
}

export {}
