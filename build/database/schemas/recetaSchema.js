"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var recetaSchema = new schema({
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  ingredients: [{
    type: schema.Types.ObjectId,
    ref: 'ingredient'
  }],
  isActive: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});

_mongoose["default"].Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

var _default = recetaSchema;
exports["default"] = _default;
//# sourceMappingURL=recetaSchema.js.map