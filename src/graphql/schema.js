import { gql } from 'apollo-server';

const typeDefs = gql`

  type User {
    name: String
    lastName: String
    email: String
    gender: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    gender: String
  }

  type Ingredient {
    name: String
  }

  input IngredientInput {
    name: String
  }

  type Receta {
    name: String
    ingredients: [Ingredient]
    difficulty: String
  }

  type Query {
    ingredients: [Ingredient]
    recetas: [Receta]
  }

  type Mutation {
    addUser(data: UserInput) : User
    addIngredient(data: IngredientInput) : Ingredient
  }
`;

export default typeDefs;
