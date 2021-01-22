"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateName = exports.updateWorkload = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var updateWorkload = function updateWorkload(teacher, workload, allSubjects) {
  /* Create teacher entry in workload */
  workload[teacher.name] = [];
  var currTeacher = workload[teacher.name];
  teacher.Lessons.forEach(function (lesson) {
    /* Check if subject is already listed in teacher's load */
    var currSubject = allSubjects.find(function (s) {
      return s.id === lesson.SubjectId;
    });
    var currSubjectIdx = currTeacher.findIndex(function (sub) {
      return sub.subjectCode === currSubject.subjectCode;
    });
    /* Update load of subject */

    if (currSubjectIdx > -1) {
      currTeacher[currSubjectIdx].numberOfClasses++;
    } else {
      currTeacher.push({
        subjectCode: currSubject.subjectCode,
        subjectName: currSubject.subjectName,
        numberOfClasses: 1
      });
    }
  });
};

exports.updateWorkload = updateWorkload;

var updateName = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(itemFromBody, itemFromQuery) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(itemFromBody !== itemFromQuery)) {
              _context.next = 4;
              break;
            }

            itemFromQuery.name = itemFromBody.name;
            _context.next = 4;
            return itemFromQuery.save();

          case 4:
            return _context.abrupt("return", itemFromQuery);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateName(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateName = updateName;