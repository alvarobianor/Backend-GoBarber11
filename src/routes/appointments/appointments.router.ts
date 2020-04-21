import { Router } from 'express';
import { parseISO } from 'date-fns';
import Repo from '../../repositories/AppointmentRepo';
import Service from '../../services/CreateAppointmentService';

// initial of a route

const appointmentRouter = Router();

const appointmentsRepo = new Repo();

// ROUTES
appointmentRouter.get('/', (req, res) =>
	res.json({ appointments: appointmentsRepo.all() }),
);

appointmentRouter.post('/', (req, res) => {
	try {
		const { provider, date } = req.body;

		const parsedDate = parseISO(date);
		const appointmentsService = new Service(appointmentsRepo);

		const appointment = appointmentsService.execute({
			provider,
			date: parsedDate,
		});

		return res.status(201).json(appointment);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
});

export default appointmentRouter;
