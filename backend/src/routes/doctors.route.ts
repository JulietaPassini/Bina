import { Router } from 'express';
import { all } from '../controllers/doctors.controller';

const router = Router();

router.get('/', all); 

export default router;
