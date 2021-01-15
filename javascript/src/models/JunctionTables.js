import { DataTypes } from 'sequelize';
import sequelize from '../config/database'
import Class from './Class'
import Teacher from './Teacher'
import Subject from './Subject'
import Student from './Student'


/* Student / Class */
const ClassRegister = sequelize.define('ClassRegister', {}, { timestamps: false, freezeTableName: true });

Student.belongsToMany(Class, {
  through: ClassRegister
});
Class.belongsToMany(Student, {
  through: ClassRegister
});

/* Class / Subject = Lesson */

const Lesson = sequelize.define('Lesson',
  {
    lessonId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  }, { timestamps: false });

Class.belongsToMany(Subject, {
  through: Lesson
})
Subject.belongsToMany(Class, {
  through: Lesson
})

/* Teacher / Lesson */

const TeacherLesson = sequelize.define('TeacherLesson', {}, { timestamps: false, });

Teacher.belongsToMany(Lesson, {
  through: TeacherLesson
})
Lesson.belongsToMany(Teacher, {
  through: TeacherLesson,
  foreignKey: 'lessonId'
})

module.exports = { Lesson };
