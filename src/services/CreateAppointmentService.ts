import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import Repo from '../repositories/AppointmentRepo';

import AppError from '../errors/AppError';

interface RequestDTO {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	public async execute({
		provider_id,
		date,
	}: RequestDTO): Promise<Appointment> {
		const appointmentsRepo = getCustomRepository(Repo);

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await appointmentsRepo.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is alredy booked');
		}

		const appointment = appointmentsRepo.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepo.save(appointment);

		return appointment;
	}
}
export default CreateAppointmentService;
