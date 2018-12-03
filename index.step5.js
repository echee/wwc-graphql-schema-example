/**
 * Arguments
 */

const { ApolloServer, gql } = require("apollo-server");
const data = require("./data.json");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    book(id: Int!): Book
  }

  type Book {
    title: String
    author: Author!
    publicationDate: String
    genre: [Genre!]!
    numberOfPages: Int!
    onLoan: Boolean
    rating: Float
  }

  type Author {
    firstName: String!
    lastName: String!
  }

  enum Genre {
    FANTASY
    HORROR
    THRILLER
    FICTION
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    book: (_root, args, _context) => data[args.id]
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

// query($id: Int!) {
//   book(id: $id) {
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

// Variables

// {
//   "id": 2
// }
