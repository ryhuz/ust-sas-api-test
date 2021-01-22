"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _JunctionTables = require("../models/JunctionTables");

var _updateDataUtil = require("../util/updateDataUtil");

var ReportsController = _express["default"].Router();

ReportsController.get('/workload', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var allSubjects, teachers, workload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Subject["default"].findAll();

          case 3:
            allSubjects = _context.sent;
            _context.next = 6;
            return _Teacher["default"].findAll({
              include: {
                model: _JunctionTables.Lesson,
                through: {
                  attributes: []
                }
              }
            });

          case 6:
            teachers = _context.sent;

            /* initialise workload object */
            workload = {};
            teachers.forEach(function (teacher) {
              (0, _updateDataUtil.updateWorkload)(teacher, workload, allSubjects);
            });
            return _context.abrupt("return", res.status(200).json(workload));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = ReportsController;
exports["default"] = _default;