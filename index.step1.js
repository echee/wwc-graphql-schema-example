// Adding some new types to the schema definition
// Introduction to Scalar types
// String | Int (Integer) | Boolean | Float

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    book: Book
  }

  type Book {
    title: String
    author: String
    publicationDate: String
    genre: String
    numberOfPages: Int
    onLoan: Boolean
    rating: Float
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello World",
    book: () => "I am a book"
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
//   }
// }
