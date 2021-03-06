import { DataTypes } from 'sequelize';
import sequelize from '../config/database'

const userAttr = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
}

const Teacher = sequelize.define('Teacher', userAttr, {
    timestamps: false,
})

module.exports = Teacher;