"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRecetaAction = exports.isRecetaActive = exports.getRecetaAction = exports.getAllRecetasAction = exports.updateRecetaAction = exports.addRecetaAction = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../../database/models");

var addRecetaAction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(recetaData) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log("Receta creada");
            _context.next = 4;
            return _models.RecetaModel.create(recetaData);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("TCL: error", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function addRecetaAction(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addRecetaAction = addRecetaAction;

var updateRecetaAction =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(filter, update) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.RecetaModel.findOneAndUpdate(filter, update, {
              "new": true
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log("TCL: updateRecetaAction -> error", _context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function updateRecetaAction(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateRecetaAction = updateRecetaAction;

var getAllRecetasAction =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.RecetaModel.find().populate('ingredients');

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log("TCL: getAllRecetasAction -> error", _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function getAllRecetasAction() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllRecetasAction = getAllRecetasAction;

var getRecetaAction =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(recetaID) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.RecetaModel.findOne({
              _id: recetaID
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log("TCL: getAllRecetasAction -> error", _context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function getRecetaAction(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getRecetaAction = getRecetaAction;

var deleteRecetaAction =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(recetaID) {
    var filter, update;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            filter = {
              _id: recetaID
            };
            update = {
              $set: {
                isActive: false
              }
            };
            _context5.next = 5;
            return updateRecetaAction(filter, update);

          case 5:
            return _context5.abrupt("return", _context5.sent);

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log("TCL: deleteRecetaAction -> error", _context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function deleteRecetaAction(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteRecetaAction = deleteRecetaAction;

var isRecetaActive =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(recetaID) {
    var receta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _models.RecetaModel.findOne({
              _id: recetaID
            });

          case 3:
            receta = _context6.sent;

            if (!receta.isActive) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", true);

          case 8:
            return _context6.abrupt("return", false);

          case 9:
            _context6.next = 14;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            console.log("TCL: isRecetaActive -> error", _context6.t0);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function isRecetaActive(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.isRecetaActive = isRecetaActive;
//# sourceMappingURL=recetasActions.js.map