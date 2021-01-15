import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';

import Teacher from './models/Teacher'
import Student from './models/Student'
import Subject from './models/Subject'
import Class from './models/Class'
import { Lesson } from './models/JunctionTables'

const router = Express.Router();

router.use('/', HealthcheckController);

router.post('/register', async (req, res) => {
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
    function validCheck(param) {
        param = `${param}`;
        if (param.trim() === "") { return false }
        else { return true }
    }

    let emptyField = [];
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
        return res.status(400).json({
            error: `Missing fields: ${emptyField.join(', ')}`
        })
    }

    try {
        /* Subject */
        try {
            let findSubject = await Subject.findOne({ where: { subjectCode: subject.subjectCode } });
            thisSubject = findSubject ? findSubject : await Subject.create({
                subjectCode: subject.subjectCode,
                subjectName: subject.name,
            });
        } catch (subjectError) {
            console.log(subjectError);
            return res.status(400).json({ error: "Failed to find/create subject" })
        }

        /* Class */
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
            return res.status(400).json({ error: "Failed to find/create class" })
        }

        /* Teacher */
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
                return res.status(400).json({ error: "Invalid Teacher Email" })
            } else {
                return res.status(400).json({ error: "Failed to find/create teacher" })
            }
        }

        /* Students */
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
                return res.status(400).json({ error: "Invalid Student Email" })
            } else {
                return res.status(400).json({ error: "Failed to find/create students" })
            }
        }

        return res.sendStatus(204);

    } catch (e) {
        console.log(e);
        return res.status(500)
    }
})

router.get('/reports/workload', async (req, res) => {
    try {
        let allSubjects = await Subject.findAll();
        let workload = {};

        /* Get all teachers */
        let teachers = await Teacher.findAll({
            include: {
                model: Lesson,
                through: {
                    attributes: []
                }
            }
        });

        teachers.forEach(teacher => {
            /* Create teacher entry in workload */
            workload[teacher.name] = [];
            let currTeacher = workload[teacher.name];
            teacher.Lessons.forEach(lesson => {
                /* Check if subject is already listed in teacher's load */
                let currSubject = allSubjects.find(s => s.id === lesson.SubjectId);
                let currSubjectIdx = currTeacher.findIndex(sub => sub.subjectCode === currSubject.subjectCode);
                /* Update load of subject */
                if (currSubjectIdx > -1) {
                    currTeacher[currSubjectIdx].numberOfClasses++;
                } else {
                    currTeacher.push({
                        subjectCode: currSubject.subjectCode,
                        subjectName: currSubject.subjectName,
                        numberOfClasses: 1,
                    })
                }
            })
        })

        return res.status(200).json(workload);
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
})

export default router;
