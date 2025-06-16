import { Router } from 'express';
import { getAll, create, update, remove, getDoctorAppointments, getById, getAppointmentWithDoctor } from '../controllers/appointments.controller';

const router = Router();

router.get('/doctor/:doctorId', getDoctorAppointments); 
router.get('/:id', getAppointmentWithDoctor); 
//router.get('/id/:id', getById); 
router.get('/', getAll);
router.post('/', create);
router.put('/:id', update); 
router.delete('/:id', remove); 

export default router;
