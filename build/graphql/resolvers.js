"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _usersActions = require("./actions/usersActions");

var _recetasActions = require("./actions/recetasActions");

var _ingredientsActions = require("./actions/ingredientsActions");

var _uploader = require("../graphql/actions/utils/uploader");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var resolvers = {
  Query: {
    ingredients: function ingredients() {
      return (0, _ingredientsActions.getAllIngredientsAction)();
    },
    recetas: function recetas() {
      return (0, _recetasActions.getAllRecetasAction)();
    },
    users: function users() {
      return (0, _usersActions.getAllUsersAction)();
    }
  },
  Mutation: {
    addUser: function () {
      var _addUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, data, context, info) {
        var _ref, createReadStream, stream, _ref2, url, userInfo;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return data.data.profileImage;

              case 3:
                _ref = _context.sent;
                createReadStream = _ref.createReadStream;
                stream = createReadStream();
                _context.next = 8;
                return (0, _uploader.storeUpload)(stream, 'image');

              case 8:
                _ref2 = _context.sent;
                url = _ref2.url;
                // registra usario
                userInfo = _objectSpread({}, data.data, {
                  profileImage: url
                });
                _context.next = 13;
                return (0, _usersActions.addUserAction)(userInfo);

              case 13:
                return _context.abrupt("return", _context.sent);

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                console.log("TCL: error", _context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function addUser(_x, _x2, _x3, _x4) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }(),
    addReceta: function () {
      var _addReceta = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, data, context, info) {
        var user, recetaInfo, ingredientID, newReceta, filter, filterReceta, filterUser, update, updateUser, updateReceta;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = context.user;
                recetaInfo = data.recetaInfo, ingredientID = data.ingredientID;
                _context2.next = 5;
                return (0, _recetasActions.addRecetaAction)(recetaInfo);

              case 5:
                newReceta = _context2.sent;
                filter = {
                  _id: ingredientID
                };
                filterReceta = {
                  _id: newReceta._id
                };
                filterUser = {
                  _id: user._id
                };
                update = {
                  $push: {
                    'recetas': newReceta._id
                  }
                };
                updateUser = {
                  $push: {
                    'recetas': newReceta._id
                  }
                };
                updateReceta = {
                  $push: {
                    'ingredients': ingredientID
                  }
                };
                _context2.next = 14;
                return (0, _ingredientsActions.updateIngredientAction)(filter, update);

              case 14:
                _context2.next = 16;
                return (0, _recetasActions.updateRecetaAction)(filterReceta, updateReceta);

              case 16:
                _context2.next = 18;
                return (0, _usersActions.updateUserAction)(filterUser, updateUser);

              case 18:
                return _context2.abrupt("return", newReceta);

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](0);
                console.log("TCL: error", _context2.t0);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 21]]);
      }));

      function addReceta(_x5, _x6, _x7, _x8) {
        return _addReceta.apply(this, arguments);
      }

      return addReceta;
    }(),
    addIngredient: function () {
      var _addIngredient = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, data, context, info) {
        var newData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return RecetaModel.create(data.data);

              case 3:
                newData = _context3.sent;
                console.log("TCL: newData", newData);
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log("TCL: error", _context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function addIngredient(_x9, _x10, _x11, _x12) {
        return _addIngredient.apply(this, arguments);
      }

      return addIngredient;
    }(),
    addFavorite: function () {
      var _addFavorite = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, data, context, info) {
        var recetaID, user, isActive, filter, update;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                recetaID = data.recetaID;
                user = context.user;
                _context4.next = 5;
                return (0, _recetasActions.isRecetaActive)(recetaID);

              case 5:
                isActive = _context4.sent;

                if (!isActive) {
                  _context4.next = 15;
                  break;
                }

                filter = {
                  _id: user._id
                };
                update = {
                  $push: {
                    'favorites': recetaID
                  }
                };
                console.log("Favorite added to user: " + user.name);
                _context4.next = 12;
                return (0, _usersActions.updateUserAction)(filter, update);

              case 12:
                return _context4.abrupt("return", _context4.sent);

              case 15:
                console.log("Favorite not added: Receta is not active.");
                return _context4.abrupt("return");

              case 17:
                _context4.next = 22;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](0);
                console.log("TCL: error", _context4.t0);

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 19]]);
      }));

      function addFavorite(_x13, _x14, _x15, _x16) {
        return _addFavorite.apply(this, arguments);
      }

      return addFavorite;
    }(),
    removeFavorite: function () {
      var _removeFavorite = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, data, context, info) {
        var recetaID, user, filter, update;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                recetaID = data.recetaID;
                user = context.user;
                filter = {
                  _id: user._id
                };
                update = {
                  $pull: {
                    'favorites': recetaID
                  }
                };
                console.log("Favorite removed from user: " + user.name);
                _context5.next = 8;
                return (0, _usersActions.updateUserAction)(filter, update);

              case 8:
                return _context5.abrupt("return", _context5.sent);

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                console.log("TCL: error", _context5.t0);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }));

      function removeFavorite(_x17, _x18, _x19, _x20) {
        return _removeFavorite.apply(this, arguments);
      }

      return removeFavorite;
    }(),
    deleteReceta: function () {
      var _deleteReceta = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(parent, data, context, info) {
        var recetaID;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                recetaID = data.recetaID;
                console.log("Receta Deleted.");
                _context6.next = 5;
                return (0, _recetasActions.deleteRecetaAction)(recetaID);

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                console.log("TCL: error", _context6.t0);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      function deleteReceta(_x21, _x22, _x23, _x24) {
        return _deleteReceta.apply(this, arguments);
      }

      return deleteReceta;
    }(),
    doLogin: function () {
      var _doLogin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(parent, data, context, info) {
        var userName, password;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                userName = data.userName, password = data.password;
                _context7.next = 4;
                return (0, _usersActions.doLoginAction)(userName, password);

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                console.log("TCL: error", _context7.t0);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 7]]);
      }));

      function doLogin(_x25, _x26, _x27, _x28) {
        return _doLogin.apply(this, arguments);
      }

      return doLogin;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;
//# sourceMappingURL=resolvers.js.map