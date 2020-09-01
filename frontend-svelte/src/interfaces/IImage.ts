interface IImageFormat {
  url: string;
  width: string;
  height: string;
}

export interface IImage {
  id: number;
  alternativeText: string;
  height: number;
  width: number;
  url: string;
  formats: {
    large: IImageFormat,
    medium: IImageFormat,
    small: IImageFormat,
    thumbnail: IImageFormat
  }
}