import Express from 'express';
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'
import Teacher from '../models/Teacher'
import { Lesson } from '../models/JunctionTables'

const RegisterController = Express.Router();

RegisterController.post('/', async (req, res) => {
    let { teacher, students, subject } = req.body;
    let toClass = req.body.class;
    let thisTeacher, thisSubject, thisClass;

    /* Check request body has all require parameters */
    if (!teacher || !students || !subject || !toClass) {
        return res.status(400).json({
            error: `Missing items: ${!teacher ? "Teacher" : ""} ${!students ? "Students" : ""} ${!subject ? "Subject" : ""} ${!toClass ? "Class" : ""}`
        })
    }

    /* Check for empty fields */
    const validCheck = (param) => {
        param = `${param}`;
        if (param.trim() === "") { return false }
        else { return true }
    }
    let emptyField = [];
    const validateFields = () => {
        for (let student of students) {
            let anyEmpty = false;
            if (!validCheck(student.name)) {
                emptyField.push('Student Name');
                anyEmpty = true;
            }
            if (!validCheck(student.email)) {
                emptyField.push('Student Email');
                anyEmpty = true;
            }
            if (anyEmpty) break;
        }
        if (!validCheck(teacher.name)) {
            emptyField.push('Teacher Name');
        }
        if (!validCheck(teacher.email)) {
            emptyField.push('Teacher Email');
        }
        if (!validCheck(subject.name)) {
            emptyField.push('Subject Name');
        }
        if (!validCheck(subject.subjectCode)) {
            emptyField.push('Subject Code');
        }
        if (!validCheck(toClass.name)) {
            emptyField.push('Class Name');
        }
        if (!validCheck(toClass.classCode)) {
            emptyField.push('Class Code');
        }
        /* Return error if any empty fields */
        if (emptyField.length) {
            return false;
        }
        return true;
    }
    if (!validateFields()) {
        return res.status(400).json({
            error: `Missing fields: ${emptyField.join(', ')}`
        })
    };

    const registerItem = async (item) => {
        switch (item) {
            case 'subject':
                try {
                    let findSubject = await Subject.findOne({ where: { subjectCode: subject.subjectCode } });
                    thisSubject = findSubject ? findSubject : await Subject.create({
                        subjectCode: subject.subjectCode,
                        subjectName: subject.name,
                    });
                } catch (subjectError) {
                    console.log(subjectError);
                    return "Failed to find/create subject";
                }
                break;
            case 'class':
                try {
                    let findClass = await Class.findOne({ where: { classCode: toClass.classCode } });
                    thisClass = findClass ? findClass : await Class.create({
                        classCode: toClass.classCode,
                        className: toClass.name,
                    });
                    /* Add subject to class */
                    await thisClass.addSubject(thisSubject);
                } catch (classError) {
                    console.log(classError);
                    return "Failed to find/create class";
                    // return res.status(400).json({ error: "Failed to find/create class" })
                }
                break;
            case 'teacher':
                try {
                    let findTeacher = await Teacher.findOne({ where: { email: teacher.email } });
                    thisTeacher = findTeacher ? findTeacher : await Teacher.create(teacher);

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
            case 'student':
                try {
                    for (let student of students) {
                        let findStudent = await Student.findOne({ where: { email: student.email } });
                        let thisStudent = findStudent ? findStudent : await Student.create(student);

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

        for (let item of items){
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
