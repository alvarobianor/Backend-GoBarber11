import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('time with time zone')
	date: Date;

	// // Omit <T, K -> A | B>
	// constructor({ provider, date }: Omit<Appointment, 'id'>) {
	// 	this.id = uuid();
	// 	this.provider = provider;
	// 	this.date = date;
	// }
}

export default Appointment;
