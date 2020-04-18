import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

// appointmentRouter.get('/', (req, res) => res.json({ appointments }));

appointmentRouter.post('/', (req, res) => {
	const { provider, date } = req.body;

	const parsedDate = startOfHour(parseISO(date));

	const findAppointmentInSameDate = appointments.find(e =>
		isEqual(e.date, parsedDate),
	);

	if (findAppointmentInSameDate) {
		return res.status(401).json({ error: 'this appointment is alredy booked' });
	}

	const appointment = new Appointment(provider, parsedDate);

	appointments.push(appointment);
	return res.status(201).json(appointment);
});

export default appointmentRouter;
