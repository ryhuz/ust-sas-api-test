"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

var classAttr = {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  classCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
};

var Class = _database["default"].define('Class', classAttr, {
  tableName: "Classes",
  timestamps: false
});

module.exports = Class;