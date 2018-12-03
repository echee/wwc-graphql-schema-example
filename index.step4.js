/**
 *  Enum Types,
 *
 * We use enums for Genre as we know the specific values a field can be
 */

const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    book: Book
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
    book: () => ({
      title: "Harry Potter and the Philosopher's Stone",
      author: { firstName: "J.K", lastName: "Rowling" },
      publicationDate: "26 June 1997",
      genre: ["FANTASY", "FICTION"],
      // genre: ["FANTASY", "FICTION", "FOOBAR"], //Forces an error on the genre type by specify a value not in the enum
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
