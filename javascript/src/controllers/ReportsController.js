import Express from 'express';
import Teacher from '../models/Teacher'
import Subject from '../models/Subject'
import { Lesson } from '../models/JunctionTables'
import { updateWorkload } from '../util/updateDataUtil'

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

        teachers.forEach(teacher => {
            updateWorkload(teacher, workload, allSubjects);
        })

        return res.status(200).json(workload);
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
})

export default ReportsController;
