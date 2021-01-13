"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../config/database"));

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
  }
};

var Teacher = _database["default"].define('Teacher', userAttr, {
  timestamps: false
});

var Student = _database["default"].define('Student', userAttr, {
  timestamps: false
});

Student.associate = function (models) {
  Student.belongsTo(models.Class);
};

module.exports = {
  Teacher: Teacher,
  Student: Student
};