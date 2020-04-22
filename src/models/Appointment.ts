import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('time with time zone')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
	// // Omit <T, K -> A | B>
	// constructor({ provider, date }: Omit<Appointment, 'id'>) {
	// 	this.id = uuid();
	// 	this.provider = provider;
	// 	this.date = date;
	// }
}

export default Appointment;
