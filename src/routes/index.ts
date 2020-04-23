import { Router } from 'express';
import appointmentRouter from './SystemRoutes/appointments.router';
import userR from './SystemRoutes/users.router';

const router = Router();
router.use('/appointments', appointmentRouter);
router.use('/users', userR);

export default router;
