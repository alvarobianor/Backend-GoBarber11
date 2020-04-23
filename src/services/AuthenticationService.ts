import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
	email: string;
	password: string;
}

export default class AuthenticationService {
	public async execute({
		email,
		password,
	}: RequestDTO): Promise<{ user: User; token: string }> {
		const userRepository = getRepository(User);

		const userEmailValidated = await userRepository.findOne({
			where: { email },
		});

		if (!userEmailValidated) {
			throw Error('Wrong email/password combination');
		}

		const passwordMatch = await compare(password, userEmailValidated.password);

		if (!passwordMatch) {
			throw Error('Wrong email/password combination');
		}

		const token = sign({}, '5be206ad969208e8069c96ad84a122d2', {
			subject: userEmailValidated.id,
			expiresIn: '1d',
		});
		return { user: userEmailValidated, token };
	}
}
