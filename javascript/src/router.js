import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';

import { Teacher } from './models/Users'
import { Subject } from './models/Subjects'

const router = Express.Router();

router.use('/', HealthcheckController);

router.get('/test', async (req, res) => {
    console.log('test')
    try {
        let teachers = await Teacher.findAll();
        let subjects = await Subject.findAll();
        return res.status(200).json({ teachers, subjects })
    } catch (e) {
        return res.status(500);
    }
})

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        let tester = await Teacher.create({ name: "myName", email: "myEmail@email.com" });
        console.log(tester)
    } catch (e) {
        console.log(e)
    }
    return res.status(200).json({ msg: "test works" })
})

export default router;
