"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var ingredientSchema = new schema({
  name: {
    type: String,
    required: true
  },
  recetas: [{
    type: schema.Types.ObjectId,
    ref: 'receta'
  }]
}, {
  timestamps: true
});

_mongoose["default"].Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

var _default = ingredientSchema;
exports["default"] = _default;
//# sourceMappingURL=ingredientSchema.js.map