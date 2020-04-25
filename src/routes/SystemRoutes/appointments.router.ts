import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Repo from '../../repositories/AppointmentRepo';
import Service from '../../services/CreateAppointmentService';
import Auth from '../../middlewares/ensureAuthenticated';
// initial of a route

const appointmentRouter = Router();
appointmentRouter.use(Auth);
// ROUTES
appointmentRouter.get('/', async (req, res) => {
	const appointmentsRepo = getCustomRepository(Repo);
	const appointment = await appointmentsRepo.find();
	return res.json({ appointments: appointment });
});

appointmentRouter.post('/', async (req, res) => {
	const { provider_id, date } = req.body;

	const parsedDate = parseISO(date);

	const appointmentsService = new Service();

	const appointment = await appointmentsService.execute({
		provider_id,
		date: parsedDate,
	});

	return res.status(201).json(appointment);
});

export default appointmentRouter;
