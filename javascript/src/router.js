import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegisterController from './controllers/RegisterController';
import ReportsController from './controllers/ReportsController';

const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/register', RegisterController);
router.use('/reports', ReportsController);

export default router;
