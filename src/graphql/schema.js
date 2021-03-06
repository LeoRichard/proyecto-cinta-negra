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
    isActive: Boolean
    profileImage: String
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    gender: String
    password: String
    profileImage: Upload
  }

  type Token {
    token: String
  }

  type Ingredient {
    _id: ID
    name: String
    recetas: [Receta]
    isActive: Boolean
  }

  input IngredientInput {
    name: String
  }

  type Receta {
    _id: ID
    name: String
    difficulty: String
    content: String
    ingredients: [Ingredient]
    isActive: Boolean
    author: [User]
    featuredImage: String
  }

  input RecetaInput {
    name: String
    difficulty: String
    content: String
    featuredImage: Upload
  }

  type Subscription {
    recetaAdded: Receta
    favoriteAdded: User
  }

  type Query {
    users: [User]
    ingredients: [Ingredient]
    getAllRecetas: [Receta]
    getUserRecetas: User @AuthDirective
  }

  type Mutation {
    addUser(data: UserInput) : Token
    deleteUser(userID: String) : User
    addFavorite(recetaID: String) : User @AuthDirective
    removeFavorite(recetaID: String) : User @AuthDirective
    addIngredient(ingredientInfo: IngredientInput, recetaID: String) : Ingredient @AuthDirective
    addIngredientToReceta(ingredientID: String, recetaID: String) : Receta
    deleteIngredient(ingredientID: String) : Ingredient @AuthDirective
    addReceta(recetaInfo: RecetaInput, ingredientID: String) : Receta @AuthDirective
    deleteReceta(recetaID: String) : Receta @AuthDirective
    removeReceta(recetaID: String) : Receta @AuthDirective
    doLogin(userName: String, password: String) : Token
  }
`;

export default typeDefs;
