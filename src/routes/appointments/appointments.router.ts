import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Repo from '../../repositories/AppointmentRepo';
import Service from '../../services/CreateAppointmentService';

// initial of a route

const appointmentRouter = Router();

// ROUTES
appointmentRouter.get('/', async (req, res) => {
	const appointmentsRepo = getCustomRepository(Repo);
	const appointment = await appointmentsRepo.find();
	return res.json({ appointments: appointment });
});

appointmentRouter.post('/', async (req, res) => {
	try {
		const { provider, date } = req.body;

		const parsedDate = parseISO(date);

		const appointmentsService = new Service();

		const appointment = await appointmentsService.execute({
			provider,
			date: parsedDate,
		});

		return res.status(201).json(appointment);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
});

export default appointmentRouter;
