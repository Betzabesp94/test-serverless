export type Author = {
  userId: number;
  username: string;
};

export type Post = {
  id: number;
  author: Author;
  title: string;
  body: string;
  createdDate: string; // ISO 8601 date string
  publishedDate: string; // ISO 8601 date string
};

export type PostBody = {
  title: string;
  body: string;
};

export interface IClerkJwtClaims {
  sub: string;
  [key: string]: any;
}
