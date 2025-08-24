export interface ImageData {
  src: string;
  alt?: string;
  lqip?: string;
}

export interface GridPostData {
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: ImageData;
  categories?: string[];
}

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  categories?: string[];
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};
