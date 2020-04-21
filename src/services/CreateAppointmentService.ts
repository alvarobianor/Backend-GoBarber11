import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import Repo from '../repositories/AppointmentRepo';

interface RequestDTO {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	// eslint-disable-next-line prettier/prettier
	private appointmentsRepo: Repo;

	constructor(appointmentsRepo: Repo) {
		this.appointmentsRepo = appointmentsRepo;
	}

	public execute({ provider, date }: RequestDTO): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = this.appointmentsRepo.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('this appointment is alredy booked');
		}

		const appointment = this.appointmentsRepo.create({
			provider,
			date: appointmentDate,
		});
		return appointment;
	}
}
export default CreateAppointmentService;
