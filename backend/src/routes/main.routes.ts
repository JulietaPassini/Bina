import { Router } from 'express';
import doctorsRouter from './doctors.route';
import appointmentsRouter from './appointments.route';

const router = Router();

router.use('/doctors', doctorsRouter); 

router.use('/appointments', appointmentsRouter);

export default router;
