"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _Teacher = _interopRequireDefault(require("./models/Teacher"));

var _Student = _interopRequireDefault(require("./models/Student"));

var _Subject = _interopRequireDefault(require("./models/Subject"));

var _Class = _interopRequireDefault(require("./models/Class"));

var _JunctionTables = require("./models/JunctionTables");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var router = _express["default"].Router();

router.use('/', _HealthcheckController["default"]);
router.post('/register', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, emptyField, _iterator, _step, _student, anyEmpty, findSubject, findClass, findTeacher, classLearning, _iterator2, _step2, student, findStudent, thisStudent;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, teacher = _req$body.teacher, students = _req$body.students, subject = _req$body.subject;
            toClass = req.body["class"];

            if (!(!teacher || !students || !subject || !toClass)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Missing items: ".concat(!teacher ? "Teacher" : "", " ").concat(!students ? "Students" : "", " ").concat(!subject ? "Subject" : "", " ").concat(!toClass ? "Class" : "")
            }));

          case 4:
            /* Check for empty fields */
            emptyField = [];
            _iterator = _createForOfIteratorHelper(students);
            _context.prev = 6;

            _iterator.s();

          case 8:
            if ((_step = _iterator.n()).done) {
              _context.next = 17;
              break;
            }

            _student = _step.value;
            anyEmpty = false;

            if (_student.name.trim() === "") {
              emptyField.push('Student Name');
              anyEmpty = true;
            }

            if (_student.email.trim() === "") {
              emptyField.push('Student Email');
              anyEmpty = true;
            }

            if (!anyEmpty) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("break", 17);

          case 15:
            _context.next = 8;
            break;

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](6);

            _iterator.e(_context.t0);

          case 22:
            _context.prev = 22;

            _iterator.f();

            return _context.finish(22);

          case 25:
            if (teacher.name.trim() === "") {
              emptyField.push('Teacher Name');
            }

            if (teacher.email.trim() === "") {
              emptyField.push('Teacher Email');
            }

            if (subject.name.trim() === "") {
              emptyField.push('Subject Name');
            }

            if (subject.subjectCode.trim() === "") {
              emptyField.push('Subject Code');
            }

            if (toClass.name.trim() === "") {
              emptyField.push('Class Name');
            }

            if (toClass.classCode.trim() === "") {
              emptyField.push('Class Code');
            }
            /* Return error if any empty fields */


            if (!emptyField.length) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Missing fields: ".concat(emptyField.join(', '))
            }));

          case 33:
            _context.prev = 33;
            _context.prev = 34;
            _context.next = 37;
            return _Subject["default"].findOne({
              where: {
                subjectCode: subject.subjectCode
              }
            });

          case 37:
            findSubject = _context.sent;

            if (!findSubject) {
              _context.next = 42;
              break;
            }

            _context.t1 = findSubject;
            _context.next = 45;
            break;

          case 42:
            _context.next = 44;
            return _Subject["default"].create({
              subjectCode: subject.subjectCode,
              subjectName: subject.name
            });

          case 44:
            _context.t1 = _context.sent;

          case 45:
            thisSubject = _context.t1;
            _context.next = 52;
            break;

          case 48:
            _context.prev = 48;
            _context.t2 = _context["catch"](34);
            console.log(_context.t2);
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create subject"
            }));

          case 52:
            _context.prev = 52;
            _context.next = 55;
            return _Class["default"].findOne({
              where: {
                classCode: toClass.classCode
              }
            });

          case 55:
            findClass = _context.sent;

            if (!findClass) {
              _context.next = 60;
              break;
            }

            _context.t3 = findClass;
            _context.next = 63;
            break;

          case 60:
            _context.next = 62;
            return _Class["default"].create({
              classCode: toClass.classCode,
              className: toClass.name
            });

          case 62:
            _context.t3 = _context.sent;

          case 63:
            thisClass = _context.t3;
            _context.next = 66;
            return thisClass.addSubject(thisSubject);

          case 66:
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t4 = _context["catch"](52);
            console.log(_context.t4);
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create class"
            }));

          case 72:
            _context.prev = 72;
            _context.next = 75;
            return _Teacher["default"].findOne({
              where: {
                email: teacher.email
              }
            });

          case 75:
            findTeacher = _context.sent;

            if (!findTeacher) {
              _context.next = 80;
              break;
            }

            _context.t5 = findTeacher;
            _context.next = 83;
            break;

          case 80:
            _context.next = 82;
            return _Teacher["default"].create(teacher);

          case 82:
            _context.t5 = _context.sent;

          case 83:
            thisTeacher = _context.t5;
            _context.next = 86;
            return _JunctionTables.Lesson.findOne({
              where: {
                classId: thisClass.id,
                subjectId: thisSubject.id
              }
            });

          case 86:
            classLearning = _context.sent;
            _context.next = 89;
            return thisTeacher.addLesson(classLearning);

          case 89:
            _context.next = 99;
            break;

          case 91:
            _context.prev = 91;
            _context.t6 = _context["catch"](72);
            console.log(_context.t6);

            if (!(_context.t6.errors[0].path === "email")) {
              _context.next = 98;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Invalid Teacher Email"
            }));

          case 98:
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create teacher"
            }));

          case 99:
            _context.prev = 99;
            _iterator2 = _createForOfIteratorHelper(students);
            _context.prev = 101;

            _iterator2.s();

          case 103:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 119;
              break;
            }

            student = _step2.value;
            _context.next = 107;
            return _Student["default"].findOne({
              where: {
                email: student.email
              }
            });

          case 107:
            findStudent = _context.sent;

            if (!findStudent) {
              _context.next = 112;
              break;
            }

            _context.t7 = findStudent;
            _context.next = 115;
            break;

          case 112:
            _context.next = 114;
            return _Student["default"].create(student);

          case 114:
            _context.t7 = _context.sent;

          case 115:
            thisStudent = _context.t7;

            /* Add student to class */
            thisStudent.addClass(thisClass);

          case 117:
            _context.next = 103;
            break;

          case 119:
            _context.next = 124;
            break;

          case 121:
            _context.prev = 121;
            _context.t8 = _context["catch"](101);

            _iterator2.e(_context.t8);

          case 124:
            _context.prev = 124;

            _iterator2.f();

            return _context.finish(124);

          case 127:
            _context.next = 137;
            break;

          case 129:
            _context.prev = 129;
            _context.t9 = _context["catch"](99);
            console.log(_context.t9);

            if (!(_context.t9.errors[0].path === "email")) {
              _context.next = 136;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Invalid Student Email"
            }));

          case 136:
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create students"
            }));

          case 137:
            return _context.abrupt("return", res.sendStatus(204));

          case 140:
            _context.prev = 140;
            _context.t10 = _context["catch"](33);
            console.log(_context.t10);
            return _context.abrupt("return", res.status(500));

          case 144:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 19, 22, 25], [33, 140], [34, 48], [52, 68], [72, 91], [99, 129], [101, 121, 124, 127]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/reports/workload', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var allSubjects, workload, teachers;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Subject["default"].findAll();

          case 3:
            allSubjects = _context2.sent;
            workload = {};
            /* Get all teachers */

            _context2.next = 7;
            return _Teacher["default"].findAll({
              include: {
                model: _JunctionTables.Lesson,
                through: {
                  attributes: []
                }
              }
            });

          case 7:
            teachers = _context2.sent;
            teachers.forEach(function (teacher) {
              workload[teacher.name] = [];
              var currTeacher = workload[teacher.name];
              teacher.Lessons.forEach(function (lesson) {
                var currSubject = allSubjects.find(function (s) {
                  return s.id === lesson.SubjectId;
                });
                var currSubjectIdx = currTeacher.findIndex(function (sub) {
                  return sub.subjectCode === currSubject.subjectCode;
                });

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
            });
            return _context2.abrupt("return", res.status(200).json(workload));

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;