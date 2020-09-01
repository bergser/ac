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

export const POSTS_BY_TAG = gql`query($limit: Int) {
  posts(
    limit: $limit,
    sort: "published_at:desc"
  ){
		title
    published_at,
    content,
    visibility,
    tags (
      where: {
      	name_contains: "visual"
    	}
    ) {
      name
    }
  }
}`;