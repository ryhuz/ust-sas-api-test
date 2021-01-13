import { DataTypes } from 'sequelize';
import sequelize from '../config/database'
import Class from './Class'

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
    classId: {
        type: DataTypes.INTEGER,
        references: {
            model: Class,
            key: 'id'
        }
    },
}

const Student = sequelize.define('Student', userAttr, {
    timestamps: false,
})

Student.belongsTo(Class);
Class.hasMany(Student);

module.exports = Student;