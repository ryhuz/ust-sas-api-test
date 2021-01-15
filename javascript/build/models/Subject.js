"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

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

module.exports = Subject;