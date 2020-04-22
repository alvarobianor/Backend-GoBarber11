import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' }) // o model é feito para a interpretação do orm
	provider: User;

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
