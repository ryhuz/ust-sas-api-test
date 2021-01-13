"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

var _Class = _interopRequireDefault(require("./Class"));

var userAttr = {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  classId: {
    type: _sequelize.DataTypes.INTEGER,
    references: {
      model: _Class["default"],
      key: 'id'
    }
  }
};

var Student = _database["default"].define('Student', userAttr, {
  timestamps: false
});

Student.belongsTo(_Class["default"]);

_Class["default"].hasMany(Student);

module.exports = Student;