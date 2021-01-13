"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

var _Class = _interopRequireDefault(require("./Class"));

var subjectAttr = {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subjectCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  subjectName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
};

var Subject = _database["default"].define('Subject', subjectAttr, {
  timestamps: false
});

var ClassesSubjects = _database["default"].define('ClassesSubjects', {}, {
  timestamps: false
});

_Class["default"].belongsToMany(Subject, {
  through: ClassesSubjects
});

Subject.belongsToMany(_Class["default"], {
  through: ClassesSubjects
});
module.exports = Subject;