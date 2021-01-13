import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';

import Teacher from './models/Teacher'
import Student from './models/Student'
import Subject from './models/Subjects'
import Class from './models/Class'

const router = Express.Router();

router.use('/', HealthcheckController);

router.get('/test', async (req, res) => {
    console.log('test')
    try {
        let teachers = await Teacher.findAll();
        let subjects = await Subject.findAll();
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500);
    }
})

router.post('/test', async (req, res) => {
    console.log(req.body)

    let { students } = req.body;
    let toClass = req.body.class;

    try {
        console.log('creating')
        let thisClass = await Class.create({ classCode: toClass.classCode, className: toClass.name });
        let theseStudents = [];
        for (let student of students) {
            let studentData = {
                ...student,
                classId: thisClass.id,
            }
            console.log(studentData)
            let thisStudent = await Student.create(studentData);
            theseStudents.push(thisStudent);
        }

        return res.status(200).json({ thisClass, theseStudents })
    } catch (e) {
        console.log(e)
        return res.status(500);
    }
})

router.get('/testAssociate', async (req, res) => {
    console.log('find class')
    try {
        console.log('finding')
        let classes = await Class.findAll({ include: Student });

        return res.status(200).json({ classes })
    } catch (e) {
        console.log(e)
        return res.status(500);
    }
})
router.get('/testAssociateR', async (req, res) => {
    console.log('find student')
    try {
        console.log('finding')
        let students = await Student.findAll({ include: Class });

        return res.status(200).json({ students })
    } catch (e) {
        console.log(e)
        return res.status(500);
    }
})
router.post('/register', async (req, res) => {
    let { teacher, students, subject } = req.body;
    let toClass = req.body.class;
    let thisTeacher, thisSubject, thisClass, theseStudents;

    /* do validation on emails */
    /* do trim validation on names and codes*/
    /* check that a class is provided if student data is sent over */

    try {
        /* Subject */
        if (subject) {
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
        }
        
        /* Class */
        if (toClass) {
            try {
                let findClass = await Class.findOne({ where: { classCode: toClass.classCode } });
                thisClass = findClass ? findClass : await Class.create({
                    classCode: toClass.classCode,
                    className: toClass.name,
                });
                /* Add subject to class */
                if (thisSubject) {
                    thisClass.addSubject(thisSubject);
                }
            } catch (classError) {
                console.log(classError);
                return res.status(400).json({ error: "Failed to find/create class" })
            }
        }

        /* Teacher */
        if (teacher) {
            try {
                let findTeacher = await Teacher.findOne({ where: { email: teacher.email } });
                thisTeacher = findTeacher ? findTeacher : await Teacher.create(teacher);
            } catch (teacherError) {
                console.log(teacherError);
                return res.status(400).json({ error: "Failed to find/create teacher" })
            }
        }

        /* Students */
        if (students) {
            try {
                theseStudents = [];
                for (let student of students) {
                    let findStudent = await Student.findOne({ where: { email: student.email } });
                    findStudent ? console.log('student valid, now setting') : console.log('no such student. now creating')
                    let thisStudent = findStudent ? findStudent : await Student.create({
                        name: student.name,
                        email: student.email,
                        classId: thisClass.id
                    });
                    theseStudents.push(thisStudent);
                }
            } catch (studentError) {
                console.log(studentError);
                return res.status(400).json({ error: "Failed to find/create students" })
            }
        }
        return res.sendStatus(204);
    } catch (e) {
        console.log(e);
        return res.status(500)
    }


    // console.log(req.body)
    // try {
    //     let tester = await Teacher.create({ name: "myName", email: "myEmail@email.com" });
    //     console.log(tester)
    // } catch (e) {
    //     console.log(e)
    // }
    // return res.status(200).json({ msg: "test works" })
})

export default router;
