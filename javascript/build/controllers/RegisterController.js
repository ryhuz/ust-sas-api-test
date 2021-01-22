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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var RegisterController = _express["default"].Router();

RegisterController.post('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, teacher, students, subject, toClass, thisTeacher, thisSubject, thisClass, validCheck, emptyField, validateFields, registerItem, anyError, items, _i, _items, item;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, teacher = _req$body.teacher, students = _req$body.students, subject = _req$body.subject;
            toClass = req.body["class"];

            if (!(!teacher || !students || !subject || !toClass)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: "Missing items: ".concat(!teacher ? "Teacher" : "", " ").concat(!students ? "Students" : "", " ").concat(!subject ? "Subject" : "", " ").concat(!toClass ? "Class" : "")
            }));

          case 4:
            /* Check for empty fields */
            validCheck = function validCheck(param) {
              param = "".concat(param);

              if (param.trim() === "") {
                return false;
              } else {
                return true;
              }
            };

            emptyField = [];

            validateFields = function validateFields() {
              var _iterator = _createForOfIteratorHelper(students),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var student = _step.value;
                  var anyEmpty = false;

                  if (!validCheck(student.name)) {
                    emptyField.push('Student Name');
                    anyEmpty = true;
                  }

                  if (!validCheck(student.email)) {
                    emptyField.push('Student Email');
                    anyEmpty = true;
                  }

                  if (anyEmpty) break;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

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


              if (emptyField.length) {
                return false;
              }

              return true;
            };

            if (validateFields()) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: "Missing fields: ".concat(emptyField.join(', '))
            }));

          case 9:
            ;

            registerItem = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(item) {
                var findSubject, findClass, findTeacher, classLearning, _iterator2, _step2, student, findStudent, thisStudent;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = item;
                        _context.next = _context.t0 === 'subject' ? 3 : _context.t0 === 'class' ? 22 : _context.t0 === 'teacher' ? 43 : _context.t0 === 'student' ? 71 : 110;
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
                          _context.next = 11;
                          break;
                        }

                        _context.t1 = findSubject;
                        _context.next = 14;
                        break;

                      case 11:
                        _context.next = 13;
                        return _Subject["default"].create({
                          subjectCode: subject.subjectCode,
                          subjectName: subject.name
                        });

                      case 13:
                        _context.t1 = _context.sent;

                      case 14:
                        thisSubject = _context.t1;
                        _context.next = 21;
                        break;

                      case 17:
                        _context.prev = 17;
                        _context.t2 = _context["catch"](3);
                        console.log(_context.t2);
                        return _context.abrupt("return", "Failed to find/create subject");

                      case 21:
                        return _context.abrupt("break", 111);

                      case 22:
                        _context.prev = 22;
                        _context.next = 25;
                        return _Class["default"].findOne({
                          where: {
                            classCode: toClass.classCode
                          }
                        });

                      case 25:
                        findClass = _context.sent;

                        if (!findClass) {
                          _context.next = 30;
                          break;
                        }

                        _context.t3 = findClass;
                        _context.next = 33;
                        break;

                      case 30:
                        _context.next = 32;
                        return _Class["default"].create({
                          classCode: toClass.classCode,
                          className: toClass.name
                        });

                      case 32:
                        _context.t3 = _context.sent;

                      case 33:
                        thisClass = _context.t3;
                        _context.next = 36;
                        return thisClass.addSubject(thisSubject);

                      case 36:
                        _context.next = 42;
                        break;

                      case 38:
                        _context.prev = 38;
                        _context.t4 = _context["catch"](22);
                        console.log(_context.t4);
                        return _context.abrupt("return", "Failed to find/create class");

                      case 42:
                        return _context.abrupt("break", 111);

                      case 43:
                        _context.prev = 43;
                        _context.next = 46;
                        return _Teacher["default"].findOne({
                          where: {
                            email: teacher.email
                          }
                        });

                      case 46:
                        findTeacher = _context.sent;

                        if (!findTeacher) {
                          _context.next = 51;
                          break;
                        }

                        _context.t5 = findTeacher;
                        _context.next = 54;
                        break;

                      case 51:
                        _context.next = 53;
                        return _Teacher["default"].create(teacher);

                      case 53:
                        _context.t5 = _context.sent;

                      case 54:
                        thisTeacher = _context.t5;
                        _context.next = 57;
                        return _JunctionTables.Lesson.findOne({
                          where: {
                            classId: thisClass.id,
                            subjectId: thisSubject.id
                          }
                        });

                      case 57:
                        classLearning = _context.sent;
                        _context.next = 60;
                        return thisTeacher.addLesson(classLearning);

                      case 60:
                        _context.next = 70;
                        break;

                      case 62:
                        _context.prev = 62;
                        _context.t6 = _context["catch"](43);
                        console.log(_context.t6);

                        if (!(_context.t6.errors[0].path === "email")) {
                          _context.next = 69;
                          break;
                        }

                        return _context.abrupt("return", "Invalid Teacher Email");

                      case 69:
                        return _context.abrupt("return", "Failed to find/create teacher");

                      case 70:
                        return _context.abrupt("break", 111);

                      case 71:
                        _context.prev = 71;
                        _iterator2 = _createForOfIteratorHelper(students);
                        _context.prev = 73;

                        _iterator2.s();

                      case 75:
                        if ((_step2 = _iterator2.n()).done) {
                          _context.next = 91;
                          break;
                        }

                        student = _step2.value;
                        _context.next = 79;
                        return _Student["default"].findOne({
                          where: {
                            email: student.email
                          }
                        });

                      case 79:
                        findStudent = _context.sent;

                        if (!findStudent) {
                          _context.next = 84;
                          break;
                        }

                        _context.t7 = findStudent;
                        _context.next = 87;
                        break;

                      case 84:
                        _context.next = 86;
                        return _Student["default"].create(student);

                      case 86:
                        _context.t7 = _context.sent;

                      case 87:
                        thisStudent = _context.t7;

                        /* Add student to class */
                        thisStudent.addClass(thisClass);

                      case 89:
                        _context.next = 75;
                        break;

                      case 91:
                        _context.next = 96;
                        break;

                      case 93:
                        _context.prev = 93;
                        _context.t8 = _context["catch"](73);

                        _iterator2.e(_context.t8);

                      case 96:
                        _context.prev = 96;

                        _iterator2.f();

                        return _context.finish(96);

                      case 99:
                        _context.next = 109;
                        break;

                      case 101:
                        _context.prev = 101;
                        _context.t9 = _context["catch"](71);
                        console.log(_context.t9);

                        if (!(_context.t9.errors[0].path === "email")) {
                          _context.next = 108;
                          break;
                        }

                        return _context.abrupt("return", "Invalid Student Email");

                      case 108:
                        return _context.abrupt("return", "Failed to find/create students");

                      case 109:
                        return _context.abrupt("break", 111);

                      case 110:
                        return _context.abrupt("break", 111);

                      case 111:
                        return _context.abrupt("return");

                      case 112:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 17], [22, 38], [43, 62], [71, 101], [73, 93, 96, 99]]);
              }));

              return function registerItem(_x3) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.prev = 11;

            /* registerItem returns error message if process fails */
            items = ['subject', 'class', 'teacher', 'students'];
            _i = 0, _items = items;

          case 14:
            if (!(_i < _items.length)) {
              _context2.next = 25;
              break;
            }

            item = _items[_i];
            _context2.next = 18;
            return registerItem(item);

          case 18:
            anyError = _context2.sent;
            console.log(item, anyError);

            if (!anyError) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: anyError
            }));

          case 22:
            _i++;
            _context2.next = 14;
            break;

          case 25:
            return _context2.abrupt("return", res.sendStatus(204));

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](11);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500));

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[11, 28]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = RegisterController;
exports["default"] = _default;