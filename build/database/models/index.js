"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecetaModel = exports.IngredientModel = exports.UserModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userSchema = _interopRequireDefault(require("../schemas/userSchema"));

var _recetaSchema = _interopRequireDefault(require("../schemas/recetaSchema"));

var _ingredientSchema = _interopRequireDefault(require("../schemas/ingredientSchema"));

var UserModel = _mongoose["default"].model('user', _userSchema["default"]);

exports.UserModel = UserModel;

var RecetaModel = _mongoose["default"].model('receta', _recetaSchema["default"]);

exports.RecetaModel = RecetaModel;

var IngredientModel = _mongoose["default"].model('ingredient', _ingredientSchema["default"]);

exports.IngredientModel = IngredientModel;
//# sourceMappingURL=index.js.map