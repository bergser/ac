import gql from "graphql-tag";

export const PostsQuery = gql`{
  posts(
    limit: 5
    sort: "published_at:desc"
  ){
		title
    published_at,
    content,
    tags (
      where: {
      	name_contains: "on movies"
    	}
    ) {
      name
    }
  }
}`;
