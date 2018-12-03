/**
 * Break down the schema more:
 *
 * Object Types (see Author),
 * so instead of returning the author as a string,
 * the author is a type with fields that are Scalar types
 */

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    book: Book
  }

  type Book {
    title: String!
    author: Author!
    publicationDate: String!
    genre: String!
    numberOfPages: Int!
    onLoan: Boolean
    rating: Float
  }

  type Author {
    firstName: String!
    lastName: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    book: () => ({
      title: "Harry Potter and the Philosopher's Stone",
      author: { firstName: "J.K", lastName: "Rowling" },
      publicationDate: "26 June 1997",
      genre: "Fantasy",
      numberOfPages: 332,
      onLoan: false,
      rating: 4.9
    })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Query

// query {
//   book {
//     title
//     author {
//       firstName
//       lastName
//     }
//     publicationDate
//     genre
//     numberOfPages
//     onLoan
//     rating
//   }
// }
