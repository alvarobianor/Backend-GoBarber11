import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentRepo {
	// eslint-disable-next-line prettier/prettier
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public get getAppointment(): Appointment[] {
		return this.appointments;
	}

	public findByDate(date: Date): Appointment | null {
		const findAppointment = this.appointments.find(e => isEqual(e.date, date));
		return findAppointment || null;
	}

	public create(provider: string, date: Date): Appointment {
		const appointment = new Appointment(provider, date);

		this.appointments.push(appointment);

		return appointment;
	}
}

export default AppointmentRepo;
