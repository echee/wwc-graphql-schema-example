/**
 * Start resolving some data and using validator types
 *
 * See how onLoan and rating return null
 * when no value is provided
 */

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    book: Book
  }

  type Book {
    title: String!
    author: String!
    publicationDate: String!
    genre: String!
    numberOfPages: Int!
    onLoan: Boolean
    rating: Float
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    book: () => ({
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K Rowling",
      publicationDate: "26 June 1997",
      genre: "Fantasy",
      numberOfPages: 332
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
//     author
//     publicationDate
//     genre
//     numberOfPages
//     onLoan
//     rating
//   }
// }
