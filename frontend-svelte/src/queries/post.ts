import gql from "graphql-tag";

export const POSTS_NEW = gql`query($limit: Int) {
  posts(
    limit: $limit,
    sort: "published_at:desc"
  ){
		title
    published_at,
    content,
    tags {
      name
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
    tags (
      where: {
      	name_contains: "visual"
    	}
    ) {
      name
    }
  }
}`;