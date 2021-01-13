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
  className: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
};

var Class = _database["default"].define('Class', classAttr, {
  tableName: "Classes",
  timestamps: false
});

Class.associate = function (models) {
  Class.hasMany(models.Students);
};

Class.associate = function (models) {
  Class.belongsToMany(models.Subject, {
    through: "TeachersSubjectsClasses"
  });
};

module.exports = {
  Class: Class
};