import { uuid } from 'uuidv4';

class Appointment {
	id: string;

	provider: string;

	date: Date;

	// Omit <T, K -> A | B>
	constructor({ provider, date }: Omit<Appointment, 'id'>) {
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}

export default Appointment;
