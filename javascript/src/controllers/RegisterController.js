import Express from 'express';
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'
import Teacher from '../models/Teacher'
import { Lesson } from '../models/JunctionTables'
import { updateName } from '../util/updateDataUtil'
import fieldsAreValid from '../util/validationUtil'

const RegisterController = Express.Router();

RegisterController.post('/', async (req, res) => {
    let { teacher, students, subject } = req.body;
    let toClass = req.body.class;
    let thisTeacher, thisSubject, thisClass;

    let validationError = fieldsAreValid(req.body)
    if (validationError) {
        return res.status(400).json({ error: validationError })
    };

    const registerItem = async (item) => {
        switch (item) {
            case 'subject':
                try {
                    let findSubject = await Subject.findOne({ where: { subjectCode: subject.subjectCode } });
                    thisSubject = findSubject ? await updateName(subject, findSubject) : await Subject.create({
                        subjectCode: subject.subjectCode,
                        name: subject.name,
                    });
                } catch (subjectError) {
                    console.log(subjectError);
                    return "Failed to find/create subject";
                }
                break;
            case 'class':
                try {
                    let findClass = await Class.findOne({ where: { classCode: toClass.classCode } });
                    thisClass = findClass ? await updateName(toClass, findClass) : await Class.create({
                        classCode: toClass.classCode,
                        name: toClass.name,
                    });
                    /* Add subject to class */
                    await thisClass.addSubject(thisSubject);
                } catch (classError) {
                    console.log(classError);
                    return "Failed to find/create class";
                }
                break;
            case 'teacher':
                try {
                    let findTeacher = await Teacher.findOne({ where: { email: teacher.email } });
                    thisTeacher = findTeacher ? await updateName(teacher, findTeacher) : await Teacher.create(teacher);

                    /* Assign teacher to lesson */
                    let classLearning = await Lesson.findOne({
                        where: {
                            classId: thisClass.id,
                            subjectId: thisSubject.id,
                        }
                    })
                    await thisTeacher.addLesson(classLearning);
                } catch (teacherError) {
                    console.log(teacherError);
                    if (teacherError.errors[0].path === "email") {
                        return "Invalid Teacher Email";
                    } else {
                        return "Failed to find/create teacher";
                    }
                }
                break;
            case 'students':
                try {
                    for (let student of students) {
                        let findStudent = await Student.findOne({ where: { email: student.email } });
                        let thisStudent = findStudent ? await updateName(student, findStudent) : await Student.create(student);

                        /* Add student to class */
                        thisStudent.addClass(thisClass);
                    }
                } catch (studentError) {
                    console.log(studentError);
                    if (studentError.errors[0].path === "email") {
                        return "Invalid Student Email";
                    } else {
                        return "Failed to find/create students";
                    }
                }
                break;
            default:
                break;
        }
        return;
    }
    try {
        /* registerItem returns error message if process fails */
        let anyError;
        let items = ['subject', 'class', 'teacher', 'students'];

        for (let item of items) {
            anyError = await registerItem(item);
            if (anyError) {
                return res.status(400).json({ error: anyError })
            }
        }

        return res.sendStatus(204);

    } catch (e) {
        console.log(e);
        return res.status(500)
    }
})

export default RegisterController;
