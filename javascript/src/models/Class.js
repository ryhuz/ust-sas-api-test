import { DataTypes } from 'sequelize';
import sequelize from '../config/database'

const classAttr = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Class = sequelize.define('Class', classAttr, {
    tableName: "Classes",
    timestamps: false,
})

module.exports = Class;
