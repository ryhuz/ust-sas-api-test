"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _Subject = _interopRequireDefault(require("../models/Subject"));

var _Class = _interopRequireDefault(require("../models/Class"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _JunctionTables = require("../models/JunctionTables");

var _updateDataUtil = require("../util/updateDataUtil");

var _validationUtil = _interopRequireDefault(require("../util/validationUtil"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var RegisterController = _express["default"].Router();

RegisterController.post('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, validationError, registerItem, anyError, items, _i, _items, item;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, teacher = _req$body.teacher, students = _req$body.students, subject = _req$body.subject;
            toClass = req.body["class"];
            validationError = (0, _validationUtil["default"])(req.body);

            if (!validationError) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: validationError
            }));

          case 5:
            ;

            registerItem = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var findSubject, findClass, findTeacher, classLearning, _iterator, _step, student, findStudent, thisStudent;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = item;
                        _context.next = _context.t0 === 'subject' ? 3 : _context.t0 === 'class' ? 24 : _context.t0 === 'teacher' ? 47 : _context.t0 === 'students' ? 77 : 118;
                        break;

                      case 3:
                        _context.prev = 3;
                        _context.next = 6;
                        return _Subject["default"].findOne({
                          where: {
                            subjectCode: subject.subjectCode
                          }
                        });

                      case 6:
                        findSubject = _context.sent;

                        if (!findSubject) {
                          _context.next = 13;
                          break;
                        }

                        _context.next = 10;
                        return (0, _updateDataUtil.updateName)(subject, findSubject);

                      case 10:
                        _context.t1 = _context.sent;
                        _context.next = 16;
                        break;

                      case 13:
                        _context.next = 15;
                        return _Subject["default"].create({
                          subjectCode: subject.subjectCode,
                          name: subject.name
                        });

                      case 15:
                        _context.t1 = _context.sent;

                      case 16:
                        thisSubject = _context.t1;
                        _context.next = 23;
                        break;

                      case 19:
                        _context.prev = 19;
                        _context.t2 = _context["catch"](3);
                        console.log(_context.t2);
                        return _context.abrupt("return", "Failed to find/create subject");

                      case 23:
                        return _context.abrupt("break", 119);

                      case 24:
                        _context.prev = 24;
                        _context.next = 27;
                        return _Class["default"].findOne({
                          where: {
                            classCode: toClass.classCode
                          }
                        });

                      case 27:
                        findClass = _context.sent;

                        if (!findClass) {
                          _context.next = 34;
                          break;
                        }

                        _context.next = 31;
                        return (0, _updateDataUtil.updateName)(toClass, findClass);

                      case 31:
                        _context.t3 = _context.sent;
                        _context.next = 37;
                        break;

                      case 34:
                        _context.next = 36;
                        return _Class["default"].create({
                          classCode: toClass.classCode,
                          name: toClass.name
                        });

                      case 36:
                        _context.t3 = _context.sent;

                      case 37:
                        thisClass = _context.t3;
                        _context.next = 40;
                        return thisClass.addSubject(thisSubject);

                      case 40:
                        _context.next = 46;
                        break;

                      case 42:
                        _context.prev = 42;
                        _context.t4 = _context["catch"](24);
                        console.log(_context.t4);
                        return _context.abrupt("return", "Failed to find/create class");

                      case 46:
                        return _context.abrupt("break", 119);

                      case 47:
                        _context.prev = 47;
                        _context.next = 50;
                        return _Teacher["default"].findOne({
                          where: {
                            email: teacher.email
                          }
                        });

                      case 50:
                        findTeacher = _context.sent;

                        if (!findTeacher) {
                          _context.next = 57;
                          break;
                        }

                        _context.next = 54;
                        return (0, _updateDataUtil.updateName)(teacher, findTeacher);

                      case 54:
                        _context.t5 = _context.sent;
                        _context.next = 60;
                        break;

                      case 57:
                        _context.next = 59;
                        return _Teacher["default"].create(teacher);

                      case 59:
                        _context.t5 = _context.sent;

                      case 60:
                        thisTeacher = _context.t5;
                        _context.next = 63;
                        return _JunctionTables.Lesson.findOne({
                          where: {
                            classId: thisClass.id,
                            subjectId: thisSubject.id
                          }
                        });

                      case 63:
                        classLearning = _context.sent;
                        _context.next = 66;
                        return thisTeacher.addLesson(classLearning);

                      case 66:
                        _context.next = 76;
                        break;

                      case 68:
                        _context.prev = 68;
                        _context.t6 = _context["catch"](47);
                        console.log(_context.t6);

                        if (!(_context.t6.errors[0].path === "email")) {
                          _context.next = 75;
                          break;
                        }

                        return _context.abrupt("return", "Invalid Teacher Email");

                      case 75:
                        return _context.abrupt("return", "Failed to find/create teacher");

                      case 76:
                        return _context.abrupt("break", 119);

                      case 77:
                        _context.prev = 77;
                        _iterator = _createForOfIteratorHelper(students);
                        _context.prev = 79;

                        _iterator.s();

                      case 81:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 99;
                          break;
                        }

                        student = _step.value;
                        _context.next = 85;
                        return _Student["default"].findOne({
                          where: {
                            email: student.email
                          }
                        });

                      case 85:
                        findStudent = _context.sent;

                        if (!findStudent) {
                          _context.next = 92;
                          break;
                        }

                        _context.next = 89;
                        return (0, _updateDataUtil.updateName)(student, findStudent);

                      case 89:
                        _context.t7 = _context.sent;
                        _context.next = 95;
                        break;

                      case 92:
                        _context.next = 94;
                        return _Student["default"].create(student);

                      case 94:
                        _context.t7 = _context.sent;

                      case 95:
                        thisStudent = _context.t7;

                        /* Add student to class */
                        thisStudent.addClass(thisClass);

                      case 97:
                        _context.next = 81;
                        break;

                      case 99:
                        _context.next = 104;
                        break;

                      case 101:
                        _context.prev = 101;
                        _context.t8 = _context["catch"](79);

                        _iterator.e(_context.t8);

                      case 104:
                        _context.prev = 104;

                        _iterator.f();

                        return _context.finish(104);

                      case 107:
                        _context.next = 117;
                        break;

                      case 109:
                        _context.prev = 109;
                        _context.t9 = _context["catch"](77);
                        console.log(_context.t9);

                        if (!(_context.t9.errors[0].path === "email")) {
                          _context.next = 116;
                          break;
                        }

                        return _context.abrupt("return", "Invalid Student Email");

                      case 116:
                        return _context.abrupt("return", "Failed to find/create students");

                      case 117:
                        return _context.abrupt("break", 119);

                      case 118:
                        return _context.abrupt("break", 119);

                      case 119:
                        return _context.abrupt("return");

                      case 120:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 19], [24, 42], [47, 68], [77, 109], [79, 101, 104, 107]]);
              }));

              return function registerItem(_x3) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.prev = 7;

            /* registerItem returns error message if process fails */
            items = ['subject', 'class', 'teacher', 'students'];
            _i = 0, _items = items;

          case 10:
            if (!(_i < _items.length)) {
              _context2.next = 20;
              break;
            }

            item = _items[_i];
            _context2.next = 14;
            return registerItem(item);

          case 14:
            anyError = _context2.sent;

            if (!anyError) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: anyError
            }));

          case 17:
            _i++;
            _context2.next = 10;
            break;

          case 20:
            return _context2.abrupt("return", res.sendStatus(204));

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](7);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500));

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = RegisterController;
exports["default"] = _default;