import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($author: String) {
    allBooks(author: $author) {
      title
      author
      published
      id
    }
  }
`