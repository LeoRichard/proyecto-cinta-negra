"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doLoginAction = exports.getAllUsersAction = exports.findUserAction = exports.updateUserAction = exports.addUserAction = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../../database/models");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

var createToken = function createToken(userData) {
  var exp = new Date().addDays(5).getTime();
  var payload = {
    _id: userData.id,
    email: userData.email,
    name: userData.name,
    exp: exp
  };

  var token = _jsonwebtoken["default"].sign(payload, process.env.JWT);

  return token;
};

var addUserAction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(userData) {
    var newUser, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.UserModel.create(userData);

          case 3:
            newUser = _context.sent;
            token = createToken(newUser);
            console.log("User " + newUser.name + " created.");
            return _context.abrupt("return", {
              token: token
            });

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log("TCL: addUserAction -> error", _context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function addUserAction(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addUserAction = addUserAction;

var getAllUsersAction =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.UserModel.find().populate({
              path: 'favorites',
              populate: {
                path: 'ingredients'
              }
            }).populate({
              path: 'recetas'
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log("TCL: getAllUsersAction -> error", _context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function getAllUsersAction() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllUsersAction = getAllUsersAction;

var findUserAction =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(filter) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.UserModel.findOne(filter);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log("TCL: findUserAction -> error", _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function findUserAction(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findUserAction = findUserAction;

var updateUserAction =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(filter, update) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.UserModel.findOneAndUpdate(filter, update, {
              "new": true
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log("TCL: updateUserAction -> error", _context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function updateUserAction(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserAction = updateUserAction;

var doLoginAction =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(userName, password) {
    var filter, currentUser, validLogin, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            filter = {
              email: userName
            };
            _context5.next = 4;
            return findUserAction(filter);

          case 4:
            currentUser = _context5.sent;
            console.log("User " + currentUser.name + " logged.");
            _context5.next = 8;
            return _bcrypt["default"].compare(password, currentUser.password);

          case 8:
            validLogin = _context5.sent;

            if (!validLogin) {
              _context5.next = 12;
              break;
            }

            token = createToken(currentUser);
            return _context5.abrupt("return", {
              token: token
            });

          case 12:
            return _context5.abrupt("return", null);

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](0);
            console.log("TCL: doLoginAction -> error", _context5.t0);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 15]]);
  }));

  return function doLoginAction(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.doLoginAction = doLoginAction;
//# sourceMappingURL=usersActions.js.map