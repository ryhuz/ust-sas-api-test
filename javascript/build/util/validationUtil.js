"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var hasEmptyFields = function hasEmptyFields(field) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  if (Array.isArray(field)) {
    var _iterator = _createForOfIteratorHelper(field),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var student = _step.value;

        for (var item in student) {
          var check = "".concat(student[item]);

          if (check === "") {
            if (type) {
              return "".concat(type, " ").concat(item[0].toUpperCase()).concat(item.slice(1));
            } else {
              return true;
            }

            ;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    for (var _item in field) {
      var _check = "".concat(field[_item]);

      if (_check === "") {
        if (type) {
          return "".concat(type, " ").concat(_item[0].toUpperCase()).concat(_item.slice(1));
        } else {
          return true;
        }

        ;
      }
    }
  }

  return false;
};

var fieldsAreValid = function fieldsAreValid(fields) {
  var teacher = fields.teacher,
      students = fields.students,
      subject = fields.subject;
  var toClass = fields["class"];
  var error = "";
  /* Check request body has all require parameters */

  if (!teacher || !students || !subject || !toClass) {
    error = "".concat(!teacher ? "Teacher " : "").concat(!students ? "Students " : "").concat(!subject ? "Subject " : "").concat(!toClass ? "Class" : "");
    return "Missing items: ".concat(error.trim());
  }
  /* Check if any fields are empty */


  if (hasEmptyFields(teacher) || hasEmptyFields(students) || hasEmptyFields(subject) || hasEmptyFields(toClass)) {
    error = "".concat(hasEmptyFields(teacher, "Teacher") ? "Teacher " : "").concat(hasEmptyFields(students, "Student") ? "Students " : "").concat(hasEmptyFields(subject, "Subject ") ? "Subject " : "").concat(hasEmptyFields(toClass, "Class") ? "Class" : "");
    return "Empty fields: ".concat(error.trim());
  }

  return;
};

var _default = fieldsAreValid;
exports["default"] = _default;