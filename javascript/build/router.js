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
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, emptyField, _iterator2, _step2, _student, anyEmpty, findSubject, findClass, findTeacher, classLearning, _iterator3, _step3, student, findStudent, thisStudent;

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
              error: "Missing items: ".concat(!teacher ? "Teacher" : "", " ").concat(!students ? "Students" : "", " ").concat(!subject ? "Subject" : "", " ").concat(!toClass ? "Class" : "")
            }));

          case 4:
            /* Check for empty fields */
            emptyField = [];
            _iterator2 = _createForOfIteratorHelper(students);
            _context5.prev = 6;

            _iterator2.s();

          case 8:
            if ((_step2 = _iterator2.n()).done) {
              _context5.next = 17;
              break;
            }

            _student = _step2.value;
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
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("break", 17);

          case 15:
            _context5.next = 8;
            break;

          case 17:
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](6);

            _iterator2.e(_context5.t0);

          case 22:
            _context5.prev = 22;

            _iterator2.f();

            return _context5.finish(22);

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

            if (!emptyField.length) {
              _context5.next = 33;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              error: "Missing fields: ".concat(emptyField.join(', '))
            }));

          case 33:
            _context5.prev = 33;
            _context5.prev = 34;
            _context5.next = 37;
            return _Subject["default"].findOne({
              where: {
                subjectCode: subject.subjectCode
              }
            });

          case 37:
            findSubject = _context5.sent;

            if (!findSubject) {
              _context5.next = 42;
              break;
            }

            _context5.t1 = findSubject;
            _context5.next = 45;
            break;

          case 42:
            _context5.next = 44;
            return _Subject["default"].create({
              subjectCode: subject.subjectCode,
              subjectName: subject.name
            });

          case 44:
            _context5.t1 = _context5.sent;

          case 45:
            thisSubject = _context5.t1;
            _context5.next = 52;
            break;

          case 48:
            _context5.prev = 48;
            _context5.t2 = _context5["catch"](34);
            console.log(_context5.t2);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create subject"
            }));

          case 52:
            _context5.prev = 52;
            _context5.next = 55;
            return _Class["default"].findOne({
              where: {
                classCode: toClass.classCode
              }
            });

          case 55:
            findClass = _context5.sent;

            if (!findClass) {
              _context5.next = 60;
              break;
            }

            _context5.t3 = findClass;
            _context5.next = 63;
            break;

          case 60:
            _context5.next = 62;
            return _Class["default"].create({
              classCode: toClass.classCode,
              className: toClass.name
            });

          case 62:
            _context5.t3 = _context5.sent;

          case 63:
            thisClass = _context5.t3;
            _context5.next = 66;
            return thisClass.addSubject(thisSubject);

          case 66:
            _context5.next = 72;
            break;

          case 68:
            _context5.prev = 68;
            _context5.t4 = _context5["catch"](52);
            console.log(_context5.t4);
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create class"
            }));

          case 72:
            _context5.prev = 72;
            _context5.next = 75;
            return _Teacher["default"].findOne({
              where: {
                email: teacher.email
              }
            });

          case 75:
            findTeacher = _context5.sent;

            if (!findTeacher) {
              _context5.next = 80;
              break;
            }

            _context5.t5 = findTeacher;
            _context5.next = 83;
            break;

          case 80:
            _context5.next = 82;
            return _Teacher["default"].create(teacher);

          case 82:
            _context5.t5 = _context5.sent;

          case 83:
            thisTeacher = _context5.t5;
            _context5.next = 86;
            return _JunctionTables.Lesson.findOne({
              where: {
                classId: thisClass.id,
                subjectId: thisSubject.id
              }
            });

          case 86:
            classLearning = _context5.sent;
            _context5.next = 89;
            return thisTeacher.addLesson(classLearning);

          case 89:
            _context5.next = 99;
            break;

          case 91:
            _context5.prev = 91;
            _context5.t6 = _context5["catch"](72);
            console.log(_context5.t6);

            if (!(_context5.t6.errors[0].path === "email")) {
              _context5.next = 98;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              error: "Invalid Teacher Email"
            }));

          case 98:
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create teacher"
            }));

          case 99:
            _context5.prev = 99;
            _iterator3 = _createForOfIteratorHelper(students);
            _context5.prev = 101;

            _iterator3.s();

          case 103:
            if ((_step3 = _iterator3.n()).done) {
              _context5.next = 120;
              break;
            }

            student = _step3.value;
            _context5.next = 107;
            return _Student["default"].findOne({
              where: {
                email: student.email
              }
            });

          case 107:
            findStudent = _context5.sent;
            findStudent ? console.log('student valid, now setting') : console.log('no such student. now creating');

            if (!findStudent) {
              _context5.next = 113;
              break;
            }

            _context5.t7 = findStudent;
            _context5.next = 116;
            break;

          case 113:
            _context5.next = 115;
            return _Student["default"].create(student);

          case 115:
            _context5.t7 = _context5.sent;

          case 116:
            thisStudent = _context5.t7;

            /* Add student to class */
            thisStudent.addClass(thisClass);

          case 118:
            _context5.next = 103;
            break;

          case 120:
            _context5.next = 125;
            break;

          case 122:
            _context5.prev = 122;
            _context5.t8 = _context5["catch"](101);

            _iterator3.e(_context5.t8);

          case 125:
            _context5.prev = 125;

            _iterator3.f();

            return _context5.finish(125);

          case 128:
            _context5.next = 138;
            break;

          case 130:
            _context5.prev = 130;
            _context5.t9 = _context5["catch"](99);
            console.log(_context5.t9);

            if (!(_context5.t9.errors[0].path === "email")) {
              _context5.next = 137;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              error: "Invalid Student Email"
            }));

          case 137:
            return _context5.abrupt("return", res.status(400).json({
              error: "Failed to find/create students"
            }));

          case 138:
            return _context5.abrupt("return", res.sendStatus(204));

          case 141:
            _context5.prev = 141;
            _context5.t10 = _context5["catch"](33);
            console.log(_context5.t10);
            return _context5.abrupt("return", res.status(500));

          case 145:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 19, 22, 25], [33, 141], [34, 48], [52, 68], [72, 91], [99, 130], [101, 122, 125, 128]]);
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