"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var schema = _mongoose["default"].Schema;
var userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    "enum": ['H', 'M']
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  favorites: [{
    type: schema.Types.ObjectId,
    ref: 'receta'
  }],
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

userSchema.pre("save", function (next) {
  var user = this;

  _bcrypt["default"].genSalt(10, function (error, salt) {
    _bcrypt["default"].hash(user.password, salt, function (error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});
var _default = userSchema;
exports["default"] = _default;
//# sourceMappingURL=userSchema.js.map