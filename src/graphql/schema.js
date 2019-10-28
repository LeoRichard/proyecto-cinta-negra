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
    _id: ID
    name: String
    recetas: [Receta]
  }

  input IngredientInput {
    name: String
  }

  type Receta {
    _id: ID
    name: String
    difficulty: String
    ingredients: [Ingredient]
  }

  input RecetaInput {
    name: String
    difficulty: String
  }

  type Query {
    users: [User]
    ingredients: [Ingredient]
    recetas: [Receta]
  }

  type Mutation {
    addUser(data: UserInput) : User
    addIngredient(ingredientInfo: IngredientInput, recetaID: String) : Ingredient
    addReceta(recetaInfo: RecetaInput, ingredientID: String) : Receta
  }
`;

export default typeDefs;
