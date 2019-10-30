import { gql } from 'apollo-server';

const typeDefs = gql`
directive @AuthDirective on QUERY | FIELD_DEFINITION | FIELD

  type User {
    name: String
    lastName: String
    email: String
    gender: String
    favorites: [Receta]
    recetas: [Receta]
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    gender: String
    password: String
  }

  type Token {
    token: String
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
    isActive: Boolean
  }

  input RecetaInput {
    name: String
    difficulty: String
  }

  type Query {
    users: [User]
    ingredients: [Ingredient]
    recetas: [Receta] @AuthDirective
  }

  type Mutation {
    addUser(data: UserInput) : Token
    addFavorite(recetaID: String) : User @AuthDirective
    addIngredient(ingredientInfo: IngredientInput, recetaID: String) : Ingredient
    addReceta(recetaInfo: RecetaInput, ingredientID: String) : Receta @AuthDirective
    removeFavorite(recetaID: String) : User @AuthDirective
    deleteReceta(recetaID: String) : Receta
    doLogin(userName: String, password: String) : Token
  }
`;

export default typeDefs;
