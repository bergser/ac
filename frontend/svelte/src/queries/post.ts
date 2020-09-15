import gql from "graphql-tag";

export const POSTS_NEW = gql`query($limit: Int) {
  posts(
    limit: $limit,
    sort: "published_at:desc"
  ){
		title
    published_at,
    feature_image {
      id
      alternativeText
      width
      height
      formats
      url
    }
    visibility,
    tags {
      name,
      slug
    }
  }
}`;

export const POSTS_BY_TAG = gql`query($tag: String $limit: Int) {
  posts(
    limit: $limit,
    sort: "published_at:desc"
    where: {
      tags: {
        name_contains: $tag
      }
    }
  ){
		title
    published_at,
    content,
    visibility,
    tags {
      name
      slug
    }
  }
}`;