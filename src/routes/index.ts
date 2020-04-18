import { Router } from 'express';
import Appoint from './appointments/appointments.router';

const router = Router();
router.use('/appointments', Appoint);

export default router;
