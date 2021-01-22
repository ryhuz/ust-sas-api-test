"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _validationUtil = _interopRequireDefault(require("../util/validationUtil"));

describe("Field validations", function () {
  test("it should accept full entries", function () {
    var full = {
      "students": [{
        "name": "Student one",
        "email": "student1@gmail.com"
      }, {
        "name": "Student two",
        "email": "student2@gmail.com"
      }],
      "class": {
        "classCode": "P1-1",
        "name": "P1 One"
      },
      "subject": {
        "subjectCode": "Eng",
        "name": "Englishhhhhh"
      },
      "teacher": {
        "name": "Teacher One",
        "email": "teacher1@gmail.com"
      }
    };
    var expectedResult = undefined;
    expect((0, _validationUtil["default"])(full)).toEqual(expectedResult);
  });
  test("it should not accept missing entries", function () {
    var students = [{
      "name": "Student one",
      "email": "student1@gmail.com"
    }, {
      "name": "Student two",
      "email": "student2@gmail.com"
    }];
    var classes = {
      "classCode": "P1-1",
      "name": "P1 One"
    };
    var subject = {
      "subjectCode": "Eng",
      "name": "Englishhhhhh"
    };
    var teacher = {
      "name": "Teacher One",
      "email": "teacher1@gmail.com"
    };
    var expectedResult = "Missing items: ";
    expect((0, _validationUtil["default"])({
      students: students,
      "class": classes,
      subject: subject
    })).stringContaining(expectedResult).stringContaining("Teacher");
    expect((0, _validationUtil["default"])({
      students: students,
      "class": classes,
      teacher: teacher
    })).stringContaining(expectedResult).stringContaining("Subject");
    expect((0, _validationUtil["default"])({
      "class": classes,
      subject: subject,
      teacher: teacher
    })).stringContaining(expectedResult).stringContaining("Students");
    expect((0, _validationUtil["default"])({
      students: students,
      teacher: teacher,
      subject: subject
    })).stringContaining(expectedResult).stringContaining("Class");
  });
});