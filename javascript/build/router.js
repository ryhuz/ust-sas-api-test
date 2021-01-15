"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _Teacher = _interopRequireDefault(require("./models/Teacher"));

var _Student = _interopRequireDefault(require("./models/Student"));

var _Subject = _interopRequireDefault(require("./models/Subject"));

var _Class = _interopRequireDefault(require("./models/Class"));

var _JunctionTables = require("./models/JunctionTables");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var router = _express["default"].Router();

router.use('/', _HealthcheckController["default"]);
router.get('/test', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var students;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('helloooo');
            _context.prev = 1;
            _context.next = 4;
            return _Student["default"].findAll({
              include: _Class["default"]
            });

          case 4:
            students = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              students: students
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/test', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var students, toClass, thisClass, theseStudents, _iterator, _step, student, studentData, thisStudent;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.body);
            students = req.body.students;
            toClass = req.body["class"];
            _context2.prev = 3;
            console.log('creating');
            _context2.next = 7;
            return _Class["default"].create({
              classCode: toClass.classCode,
              className: toClass.name
            });

          case 7:
            thisClass = _context2.sent;
            theseStudents = [];
            _iterator = _createForOfIteratorHelper(students);
            _context2.prev = 10;

            _iterator.s();

          case 12:
            if ((_step = _iterator.n()).done) {
              _context2.next = 22;
              break;
            }

            student = _step.value;
            studentData = _objectSpread(_objectSpread({}, student), {}, {
              classId: thisClass.id
            });
            console.log(studentData);
            _context2.next = 18;
            return _Student["default"].create(studentData);

          case 18:
            thisStudent = _context2.sent;
            theseStudents.push(thisStudent);

          case 20:
            _context2.next = 12;
            break;

          case 22:
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](10);

            _iterator.e(_context2.t0);

          case 27:
            _context2.prev = 27;

            _iterator.f();

            return _context2.finish(27);

          case 30:
            return _context2.abrupt("return", res.status(200).json({
              thisClass: thisClass,
              theseStudents: theseStudents
            }));

          case 33:
            _context2.prev = 33;
            _context2.t1 = _context2["catch"](3);
            console.log(_context2.t1);
            return _context2.abrupt("return", res.status(500));

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 33], [10, 24, 27, 30]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/testAssociate', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var classes;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('find class');
            _context3.prev = 1;
            console.log('finding');
            _context3.next = 5;
            return _Class["default"].findAll({
              include: _Student["default"]
            });

          case 5:
            classes = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              classes: classes
            }));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/testAssociateR', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var students;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('find student');
            _context4.prev = 1;
            console.log('finding');
            _context4.next = 5;
            return _Student["default"].findAll({
              include: _Class["default"]
            });

          case 5:
            students = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              students: students
            }));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/register', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, findSubject, findClass, findTeacher, classLearning, _iterator2, _step2, student, findStudent, thisStudent;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, teacher = _req$body.teacher, students = _req$body.students, subject = _req$body.subject;
            toClass = req.body["class"];

            if (!(!teacher || !students || !subject || !toClass)) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              error: "Missing fields: ".concat(!teacher ? "Teacher" : "", " ").concat(!students ? "Students" : "", " ").concat(!subject ? "Subject" : "", " ").concat(!toClass ? "Class" : "")
            }));

          case 4:
            _context5.prev = 4;
            _context5.prev = 5;
            _context5.next = 8;
            return _Subject["default"].findOne({
              where: {
                subjectCode: subject.subjectCode
              }
            });

          case 8:
            findSubject = _context5.sent;

            if (!findSubject) {
              _context5.next = 13;
              break;
            }

            _context5.t0 = findSubject;
            _context5.next = 16;
            break;

          case 13:
            _context5.next = 15;
            return _Subject["default"].create({
              subjectCode: subject.subjectCode,
              subjectName: subject.name
            });

          case 15:
            _context5.t0 = _context5.sent;

          case 16:
            thisSubject = _context5.t0;
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t1 = _context5["catch"](5);
            console.log(_context5.t1);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create subject"
            }));

          case 23:
            _context5.prev = 23;
            _context5.next = 26;
            return _Class["default"].findOne({
              where: {
                classCode: toClass.classCode
              }
            });

          case 26:
            findClass = _context5.sent;

            if (!findClass) {
              _context5.next = 31;
              break;
            }

            _context5.t2 = findClass;
            _context5.next = 34;
            break;

          case 31:
            _context5.next = 33;
            return _Class["default"].create({
              classCode: toClass.classCode,
              className: toClass.name
            });

          case 33:
            _context5.t2 = _context5.sent;

          case 34:
            thisClass = _context5.t2;
            _context5.next = 37;
            return thisClass.addSubject(thisSubject);

          case 37:
            _context5.next = 43;
            break;

          case 39:
            _context5.prev = 39;
            _context5.t3 = _context5["catch"](23);
            console.log(_context5.t3);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create class"
            }));

          case 43:
            _context5.prev = 43;
            _context5.next = 46;
            return _Teacher["default"].findOne({
              where: {
                email: teacher.email
              }
            });

          case 46:
            findTeacher = _context5.sent;

            if (!findTeacher) {
              _context5.next = 51;
              break;
            }

            _context5.t4 = findTeacher;
            _context5.next = 54;
            break;

          case 51:
            _context5.next = 53;
            return _Teacher["default"].create(teacher);

          case 53:
            _context5.t4 = _context5.sent;

          case 54:
            thisTeacher = _context5.t4;
            _context5.next = 57;
            return _JunctionTables.Lesson.findOne({
              where: {
                classId: thisClass.id,
                subjectId: thisSubject.id
              }
            });

          case 57:
            classLearning = _context5.sent;
            _context5.next = 60;
            return thisTeacher.addLesson(classLearning);

          case 60:
            _context5.next = 66;
            break;

          case 62:
            _context5.prev = 62;
            _context5.t5 = _context5["catch"](43);
            console.log(_context5.t5);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create teacher"
            }));

          case 66:
            _context5.prev = 66;
            _iterator2 = _createForOfIteratorHelper(students);
            _context5.prev = 68;

            _iterator2.s();

          case 70:
            if ((_step2 = _iterator2.n()).done) {
              _context5.next = 87;
              break;
            }

            student = _step2.value;
            _context5.next = 74;
            return _Student["default"].findOne({
              where: {
                email: student.email
              }
            });

          case 74:
            findStudent = _context5.sent;
            findStudent ? console.log('student valid, now setting') : console.log('no such student. now creating');

            if (!findStudent) {
              _context5.next = 80;
              break;
            }

            _context5.t6 = findStudent;
            _context5.next = 83;
            break;

          case 80:
            _context5.next = 82;
            return _Student["default"].create(student);

          case 82:
            _context5.t6 = _context5.sent;

          case 83:
            thisStudent = _context5.t6;
            thisStudent.addClass(thisClass);

          case 85:
            _context5.next = 70;
            break;

          case 87:
            _context5.next = 92;
            break;

          case 89:
            _context5.prev = 89;
            _context5.t7 = _context5["catch"](68);

            _iterator2.e(_context5.t7);

          case 92:
            _context5.prev = 92;

            _iterator2.f();

            return _context5.finish(92);

          case 95:
            _context5.next = 101;
            break;

          case 97:
            _context5.prev = 97;
            _context5.t8 = _context5["catch"](66);
            console.log(_context5.t8);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create students"
            }));

          case 101:
            return _context5.abrupt("return", res.sendStatus(204));

          case 104:
            _context5.prev = 104;
            _context5.t9 = _context5["catch"](4);
            console.log(_context5.t9);
            return _context5.abrupt("return", res.status(500));

          case 108:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 104], [5, 19], [23, 39], [43, 62], [66, 97], [68, 89, 92, 95]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/reports/workload', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var allSubjects, workload, teachers;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Subject["default"].findAll();

          case 3:
            allSubjects = _context6.sent;
            workload = {};
            _context6.next = 7;
            return _Teacher["default"].findAll({
              include: {
                model: _JunctionTables.Lesson,
                through: {
                  attributes: []
                }
              }
            });

          case 7:
            teachers = _context6.sent;
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
            return _context6.abrupt("return", res.status(200).json({
              workload: workload
            }));

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 12]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;