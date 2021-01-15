"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

var _Class = _interopRequireDefault(require("./Class"));

var _Teacher = _interopRequireDefault(require("./Teacher"));

var _Subject = _interopRequireDefault(require("./Subject"));

var _Student = _interopRequireDefault(require("./Student"));

/* Student / Class */
var ClassRegister = _database["default"].define('ClassRegister', {}, {
  timestamps: false,
  freezeTableName: true
});

_Student["default"].belongsToMany(_Class["default"], {
  through: ClassRegister
});

_Class["default"].belongsToMany(_Student["default"], {
  through: ClassRegister
});
/* Class / Subject = Lesson */


var Lesson = _database["default"].define('Lesson', {
  lessonId: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  timestamps: false
});

_Class["default"].belongsToMany(_Subject["default"], {
  through: Lesson
});

_Subject["default"].belongsToMany(_Class["default"], {
  through: Lesson
});
/* Teacher / Lesson */


var TeacherLesson = _database["default"].define('TeacherLesson', {}, {
  timestamps: false
});

_Teacher["default"].belongsToMany(Lesson, {
  through: TeacherLesson
});

Lesson.belongsToMany(_Teacher["default"], {
  through: TeacherLesson,
  foreignKey: 'lessonId'
});
module.exports = {
  Lesson: Lesson
};