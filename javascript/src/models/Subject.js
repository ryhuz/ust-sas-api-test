import { DataTypes } from 'sequelize';
import sequelize from '../config/database'

const subjectAttr = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Subject = sequelize.define('Subject', subjectAttr, {
    timestamps: false,
})

module.exports = Subject;
