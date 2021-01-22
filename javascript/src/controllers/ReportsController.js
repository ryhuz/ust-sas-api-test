import Express from 'express';
import Teacher from '../models/Teacher'
import Subject from '../models/Subject'
import { Lesson } from '../models/JunctionTables'

const ReportsController = Express.Router();

ReportsController.get('/workload', async (req, res) => {
    try {
        /* Get subjects and teachers */
        let allSubjects = await Subject.findAll();
        let teachers = await Teacher.findAll({
            include: {
                model: Lesson,
                through: {
                    attributes: []
                }
            }
        });
        /* initialise workload object */
        let workload = {};

        const updateWorkload = (teacher) => {
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
        }

        teachers.forEach(teacher => {
            updateWorkload(teacher);
        })

        return res.status(200).json(workload);
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
})

export default ReportsController;
