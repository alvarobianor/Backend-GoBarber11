import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';
// import Appointment from '../../models/Appointment';
import Repo from '../../repositories/AppointmentRepo';

// initial of a route

const appointmentRouter = Router();

const appointmentsRepo = new Repo();

appointmentRouter.get('/', (req, res) =>
	res.json({ appointments: appointmentsRepo.all() }),
);

appointmentRouter.post('/', (req, res) => {
	const { provider, date } = req.body;

	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = appointmentsRepo.findByDate(parsedDate);

	if (findAppointmentInSameDate) {
		return res.status(401).json({ error: 'this appointment is alredy booked' });
	}

	const appointment = appointmentsRepo.create(provider, parsedDate);
	return res.status(201).json(appointment);
});

export default appointmentRouter;
