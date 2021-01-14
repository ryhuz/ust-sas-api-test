import { DataTypes } from 'sequelize';
import sequelize from '../config/database'
import Class from './Class'
import Teacher from './Teacher'
import Subject from './Subjects'

const Lesson = sequelize.define('Lesson',
  {
    lessonId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  },
  { timestamps: false });

Class.belongsToMany(Subject, {
  through: Lesson
})
Subject.belongsToMany(Class, {
  through: Lesson
})

const TeacherLesson = sequelize.define('TeacherLesson',
  {},
  {
    timestamps: false,
  });

Teacher.belongsToMany(Lesson, {
  through: TeacherLesson
})
Lesson.belongsToMany(Teacher, {
  through: TeacherLesson,
  foreignKey: 'lessonId'
})

module.exports = { Lesson, TeacherLesson };
