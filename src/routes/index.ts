import { Router } from 'express';
import appointmentRouter from './SystemRoutes/appointments.router';
import userR from './SystemRoutes/users.router';
import sessionR from './SystemRoutes/session.router';

const router = Router();
router.use('/appointments', appointmentRouter);
router.use('/users', userR);
router.use('/sessions', sessionR);

export default router;
