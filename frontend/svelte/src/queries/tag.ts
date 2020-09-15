import gql from "graphql-tag";

export const TAGS_BY_STRING = gql`query($searchString: String) {
  tags(
    where: {
      name_contains: $searchString
    }
  ){
    name
    slug
  }
}`;