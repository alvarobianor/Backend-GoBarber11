import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface AP {
	id: string;
	provider: string;
	date: Date;
}

const appointmentRouter = Router();

const appointments: AP[] = [];

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

	const appointment = {
		id: uuid(),
		provider,
		date: parsedDate,
	};

	appointments.push(appointment);
	return res.status(201).json(appointment);
});

export default appointmentRouter;
