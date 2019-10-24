import { gql } from 'apollo-server';

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Person {
    name: String
    age: Int
  }

  type Recetas {
    name: String
    ingredients: String
    difficulty: String
  }

  type Query {
    books: [Book]
    person: [Person]
    recetas: [Recetas]
  }
`;

export default typeDefs;
