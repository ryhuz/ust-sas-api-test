import { DataTypes } from 'sequelize';
import sequelize from '../config/database'
import Class from './Class'
import Teacher from './Teacher'

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
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

const Subject = sequelize.define('Subject', subjectAttr, {
    timestamps: false,
})

const ClassesSubjects = sequelize.define('ClassesSubjects',
    {},
    { timestamps: false });

Class.belongsToMany(Subject, {
    through: ClassesSubjects
})
Subject.belongsToMany(Class, {
    through: ClassesSubjects
})
module.exports = Subject;