import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import Auth from '../config/Auth';

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

		const { secret, expiresIn } = Auth.jwt;
		const token = sign({}, secret, {
			subject: userEmailValidated.id,
			expiresIn,
		});
		return { user: userEmailValidated, token };
	}
}
