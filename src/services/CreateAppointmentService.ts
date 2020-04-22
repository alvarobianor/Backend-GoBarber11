import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import Repo from '../repositories/AppointmentRepo';

interface RequestDTO {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
		const appointmentsRepo = getCustomRepository(Repo);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentsRepo.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('this appointment is alredy booked');
		}

		const appointment = appointmentsRepo.create({
			provider,
			date: appointmentDate,
		});

		await appointmentsRepo.save(appointment);

		return appointment;
	}
}
export default CreateAppointmentService;
