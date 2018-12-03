/**
 * Interfaces
 *
 * What if we didn't just want a physical book, but other resources
 */

const { ApolloServer, gql } = require("apollo-server");
const data = require("./data.withInterface.json");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    resource(id: Int!): Resource
    book(id: Int!): Book
  }

  interface Resource {
    title: String
    author: Author!
    publicationDate: String
    genre: [Genre]!
    resourceType: Resource!
    onLoan: Boolean
    rating: Float
  }

  type Book implements Resource {
    title: String
    author: Author!
    publicationDate: String
    genre: [Genre]!
    resourceType: Resource!
    onLoan: Boolean
    rating: Float
    numberOfPages: Int!
  }

  type AudioBook implements Resource {
    title: String
    author: Author!
    publicationDate: String
    genre: [Genre]!
    resourceType: Resource!
    onLoan: Boolean
    rating: Float
    durationInMinutes: Int!
  }

  type Author {
    firstName: String!
    lastName: String!
  }

  enum resourceType {
    PHYSICAL_BOOK
    AUDIO_BOOK
  }

  enum Genre {
    FANTASY
    HORROR
    THRILLER
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    resource: (_root, args, _context) => data[args.id],
    book: (_root, args, _context) => data[args.id]
  },
  Resource: {
    __resolveType(obj, context, info) {
      if (obj.resourceType === "PHYSICAL_BOOK") {
        return "Book";
      }
      if (obj.resourceType === "AUDIO_BOOK") {
        return "AudioBook";
      }
      return null;
    }
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
//   resource(id: $id) {
//     title
//     author {
//       firstName
//       lastName
//     }
//     publicationDate
//     genre
//     onLoan
//     rating
//     ...on AudioBook {
//       durationInMinutes
//     }
//     ...on Book {
//       numberOfPages
//     }
//   }
// }

// Variables

// Test out id 1, 2, and 3
// {
//   "id": 3
// }
