import gql from "graphql-tag";

export const ME = gql`query {
  query {
    me {
      id
      username
      email
      role {
        type
      }
    }
  }
}`;