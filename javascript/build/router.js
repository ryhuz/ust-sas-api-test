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
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, validCheck, emptyField, _iterator, _step, _student, anyEmpty, findSubject, findClass, findTeacher, classLearning, _iterator2, _step2, student, findStudent, thisStudent;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            validCheck = function _validCheck(param) {
              param = "".concat(param);

              if (param.trim() === "") {
                return false;
              } else {
                return true;
              }
            };

            _req$body = req.body, teacher = _req$body.teacher, students = _req$body.students, subject = _req$body.subject;
            toClass = req.body["class"];

            if (!(!teacher || !students || !subject || !toClass)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Missing items: ".concat(!teacher ? "Teacher" : "", " ").concat(!students ? "Students" : "", " ").concat(!subject ? "Subject" : "", " ").concat(!toClass ? "Class" : "")
            }));

          case 5:
            /* Check for empty fields */
            emptyField = [];
            _iterator = _createForOfIteratorHelper(students);
            _context.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            _student = _step.value;
            anyEmpty = false;

            if (!validCheck(_student.name)) {
              emptyField.push('Student Name');
              anyEmpty = true;
            }

            if (!validCheck(_student.email)) {
              emptyField.push('Student Email');
              anyEmpty = true;
            }

            if (!anyEmpty) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("break", 18);

          case 16:
            _context.next = 9;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](7);

            _iterator.e(_context.t0);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            if (!validCheck(teacher.name)) {
              emptyField.push('Teacher Name');
            }

            if (!validCheck(teacher.email)) {
              emptyField.push('Teacher Email');
            }

            if (!validCheck(subject.name)) {
              emptyField.push('Subject Name');
            }

            if (!validCheck(subject.subjectCode)) {
              emptyField.push('Subject Code');
            }

            if (!validCheck(toClass.name)) {
              emptyField.push('Class Name');
            }

            if (!validCheck(toClass.classCode)) {
              emptyField.push('Class Code');
            }
            /* Return error if any empty fields */


            if (!emptyField.length) {
              _context.next = 34;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Missing fields: ".concat(emptyField.join(', '))
            }));

          case 34:
            _context.prev = 34;
            _context.prev = 35;
            _context.next = 38;
            return _Subject["default"].findOne({
              where: {
                subjectCode: subject.subjectCode
              }
            });

          case 38:
            findSubject = _context.sent;

            if (!findSubject) {
              _context.next = 43;
              break;
            }

            _context.t1 = findSubject;
            _context.next = 46;
            break;

          case 43:
            _context.next = 45;
            return _Subject["default"].create({
              subjectCode: subject.subjectCode,
              subjectName: subject.name
            });

          case 45:
            _context.t1 = _context.sent;

          case 46:
            thisSubject = _context.t1;
            _context.next = 53;
            break;

          case 49:
            _context.prev = 49;
            _context.t2 = _context["catch"](35);
            console.log(_context.t2);
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create subject"
            }));

          case 53:
            _context.prev = 53;
            _context.next = 56;
            return _Class["default"].findOne({
              where: {
                classCode: toClass.classCode
              }
            });

          case 56:
            findClass = _context.sent;

            if (!findClass) {
              _context.next = 61;
              break;
            }

            _context.t3 = findClass;
            _context.next = 64;
            break;

          case 61:
            _context.next = 63;
            return _Class["default"].create({
              classCode: toClass.classCode,
              className: toClass.name
            });

          case 63:
            _context.t3 = _context.sent;

          case 64:
            thisClass = _context.t3;
            _context.next = 67;
            return thisClass.addSubject(thisSubject);

          case 67:
            _context.next = 73;
            break;

          case 69:
            _context.prev = 69;
            _context.t4 = _context["catch"](53);
            console.log(_context.t4);
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create class"
            }));

          case 73:
            _context.prev = 73;
            _context.next = 76;
            return _Teacher["default"].findOne({
              where: {
                email: teacher.email
              }
            });

          case 76:
            findTeacher = _context.sent;

            if (!findTeacher) {
              _context.next = 81;
              break;
            }

            _context.t5 = findTeacher;
            _context.next = 84;
            break;

          case 81:
            _context.next = 83;
            return _Teacher["default"].create(teacher);

          case 83:
            _context.t5 = _context.sent;

          case 84:
            thisTeacher = _context.t5;
            _context.next = 87;
            return _JunctionTables.Lesson.findOne({
              where: {
                classId: thisClass.id,
                subjectId: thisSubject.id
              }
            });

          case 87:
            classLearning = _context.sent;
            _context.next = 90;
            return thisTeacher.addLesson(classLearning);

          case 90:
            _context.next = 100;
            break;

          case 92:
            _context.prev = 92;
            _context.t6 = _context["catch"](73);
            console.log(_context.t6);

            if (!(_context.t6.errors[0].path === "email")) {
              _context.next = 99;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Invalid Teacher Email"
            }));

          case 99:
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create teacher"
            }));

          case 100:
            _context.prev = 100;
            _iterator2 = _createForOfIteratorHelper(students);
            _context.prev = 102;

            _iterator2.s();

          case 104:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 120;
              break;
            }

            student = _step2.value;
            _context.next = 108;
            return _Student["default"].findOne({
              where: {
                email: student.email
              }
            });

          case 108:
            findStudent = _context.sent;

            if (!findStudent) {
              _context.next = 113;
              break;
            }

            _context.t7 = findStudent;
            _context.next = 116;
            break;

          case 113:
            _context.next = 115;
            return _Student["default"].create(student);

          case 115:
            _context.t7 = _context.sent;

          case 116:
            thisStudent = _context.t7;

            /* Add student to class */
            thisStudent.addClass(thisClass);

          case 118:
            _context.next = 104;
            break;

          case 120:
            _context.next = 125;
            break;

          case 122:
            _context.prev = 122;
            _context.t8 = _context["catch"](102);

            _iterator2.e(_context.t8);

          case 125:
            _context.prev = 125;

            _iterator2.f();

            return _context.finish(125);

          case 128:
            _context.next = 138;
            break;

          case 130:
            _context.prev = 130;
            _context.t9 = _context["catch"](100);
            console.log(_context.t9);

            if (!(_context.t9.errors[0].path === "email")) {
              _context.next = 137;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: "Invalid Student Email"
            }));

          case 137:
            return _context.abrupt("return", res.status(400).json({
              error: "Failed to find/create students"
            }));

          case 138:
            return _context.abrupt("return", res.sendStatus(204));

          case 141:
            _context.prev = 141;
            _context.t10 = _context["catch"](34);
            console.log(_context.t10);
            return _context.abrupt("return", res.status(500));

          case 145:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 20, 23, 26], [34, 141], [35, 49], [53, 69], [73, 92], [100, 130], [102, 122, 125, 128]]);
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