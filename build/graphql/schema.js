"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\ndirective @AuthDirective on QUERY | FIELD_DEFINITION | FIELD\n\n  type User {\n    name: String\n    lastName: String\n    email: String\n    gender: String\n    favorites: [Receta]\n    recetas: [Receta]\n  }\n\n  input UserInput {\n    name: String\n    lastName: String\n    email: String\n    gender: String\n    password: String\n    profileImage: Upload\n  }\n\n  type Token {\n    token: String\n  }\n\n  type Ingredient {\n    _id: ID\n    name: String\n    recetas: [Receta]\n  }\n\n  input IngredientInput {\n    name: String\n  }\n\n  type Receta {\n    _id: ID\n    name: String\n    difficulty: String\n    ingredients: [Ingredient]\n    isActive: Boolean\n  }\n\n  input RecetaInput {\n    name: String\n    difficulty: String\n  }\n\n  type Query {\n    users: [User]\n    ingredients: [Ingredient]\n    recetas: [Receta] @AuthDirective\n  }\n\n  type Mutation {\n    addUser(data: UserInput) : Token\n    addFavorite(recetaID: String) : User @AuthDirective\n    addIngredient(ingredientInfo: IngredientInput, recetaID: String) : Ingredient\n    addReceta(recetaInfo: RecetaInput, ingredientID: String) : Receta @AuthDirective\n    removeFavorite(recetaID: String) : User @AuthDirective\n    deleteReceta(recetaID: String) : Receta\n    doLogin(userName: String, password: String) : Token\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var typeDefs = (0, _apolloServer.gql)(_templateObject());
var _default = typeDefs;
exports["default"] = _default;
//# sourceMappingURL=schema.js.map